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
  const [showUnselectedOptions, setShowUnselectedOption] =
    useState<boolean>(false);

  useEffect(() => {
    if (selected) {
      setShowUnselectedOption(true);
    }
  }, [questionId]);

  return (
    <div
      css={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {question.map((each) => {
        const isClicked = each.id === selected;
        const showAnimation = selected !== undefined;
        const text = each.text;
        return (
          <motion.div
            key={`${questionId}-${each.id}-${each.text}`}
            animate={{
              y: !showUnselectedOptions && showAnimation && !isClicked ? 10 : 0,
              opacity:
                !showUnselectedOptions && showAnimation && !isClicked ? 0 : 1,
            }}
            onClick={() => {
              onClick(each.id);
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
