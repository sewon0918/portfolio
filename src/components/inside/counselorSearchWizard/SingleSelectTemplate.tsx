import { motion } from "framer-motion";
import { CounselorSearchWizardOptionType } from "@/data/inside/counselorSearchWizardQ";
import { useEffect, useState } from "react";
import SelectButton from "./SelectButton";

export default function SingleSelectTemplate({
  questionId,
  question,
  selected,
  onClick,
  onAnimationComplete,
}: {
  questionId: string;
  question: CounselorSearchWizardOptionType[];
  selected: string;
  onClick: (id: string) => void;
  onAnimationComplete: () => void;
}) {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    setShowAnimation(false);
  }, [questionId]);

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        ...(showAnimation && { pointerEvents: "none" }),
      }}
    >
      {question.map((each) => {
        const isClicked = each.id === selected;
        const text = each.text;
        return (
          <motion.div
            key={`${questionId}-${each.id}-${each.text}`}
            animate={{
              y: showAnimation && !isClicked ? 10 : 0,
              opacity: showAnimation && !isClicked ? 0 : 1,
            }}
            onClick={() => {
              onClick(each.id);
              setShowAnimation(true);
              setTimeout(() => {
                onAnimationComplete();
              }, 200);
            }}
          >
            <SelectButton text={text} isClicked={isClicked} />
          </motion.div>
        );
      })}
    </div>
  );
}
