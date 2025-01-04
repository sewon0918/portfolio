import { CounselorSearchWizardOptionType } from "@/data/inside/counselorSearchWizardQ";
import { motion } from "framer-motion";
import { useState } from "react";
import SelectButton from "./SelectButton";
import NextButton from "./NextButton";

export default function MultipleSelectTemplate({
  questionId,
  question,
  selected,
  onClick,
  onArrowClick,
}: {
  questionId: string;
  question: CounselorSearchWizardOptionType[];
  selected: string[];
  onClick: (id: string) => void;
  onArrowClick: () => void;
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  return (
    <motion.div>
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
          const isClicked = selected?.includes(each.id);
          const text = each.text;
          return (
            <motion.div
              key={`${questionId}=${each.id}-${each.text}`}
              animate={{
                y: showAnimation && !isClicked ? 10 : 0,
                opacity: showAnimation && !isClicked ? 0 : 1,
              }}
              onClick={() => {
                onClick(each.id);
              }}
              onAnimationComplete={() => {
                if (showAnimation) {
                  onArrowClick();
                }
              }}
            >
              <SelectButton text={text} isClicked={isClicked} hasCheck />
            </motion.div>
          );
        })}
      </div>
      <NextButton
        disabled={!(selected && selected.length > 0)}
        onClick={() => {
          setShowAnimation(true);
        }}
      />
    </motion.div>
  );
}
