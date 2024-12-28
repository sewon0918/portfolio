import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useInterval } from "@toss/react";
import { Text24 } from "@/components/common/Text";

export default function Begin() {
  const navigate = useNavigate();

  const instructionList: string[] = [
    "지금부터 마음 속 이야기를 하나씩 꺼내볼게요",
    "떠오르는 대로 솔직하게 선택해주세요",
  ];
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const showNextText = () => {
    setCurrentIdx((currentIdx) => currentIdx + 1);
  };

  useInterval(() => {
    showNextText();
    if (currentIdx === instructionList.length - 1) {
      setTimeout(() => {
        navigate("/inside/search");
      }, 500);
    }
  }, 2000);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "0 20px",
      }}
    >
      <div
        css={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: "34px",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            css={{
              width: "100%",
              position: "absolute",
              wordBreak: "keep-all",
            }}
          >
            <Text24
              customCss={{
                color: "white",
                textAlign: "center",
              }}
            >
              {instructionList[currentIdx]}
            </Text24>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
