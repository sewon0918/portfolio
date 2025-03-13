import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import loading from "@/assets/inside/counselor-search-wizard/loading_white.json";
import check_white from "@/assets/common/check_white.json";
import Lottie from "@/components/common/Lottie";
import { useInterval } from "@toss/react";
import { Text24 } from "@/components/common/Text";

export default function Analysis() {
  const instructionData = [
    {
      text: "꼭 맞는 상담사를 찾고 있어요",
      lottieData: loading,
      lottieLoop: true,
    },
    {
      text: "전담 상담사가 배정됐어요",
      lottieData: check_white,
      lottieLoop: false,
    },
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const showNextText = () => {
    setCurrentIdx((currentIdx) => currentIdx + 1);
  };

  useInterval(() => {
    if (currentIdx < instructionData.length - 1) {
      showNextText();
    }
  }, 2000);

  return (
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          css={{
            width: "100%",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div css={{ width: "72px", height: "72px" }}>
            <Lottie
              lottieData={instructionData[currentIdx].lottieData}
              loop={instructionData[currentIdx].lottieLoop}
              autoplay
            />
          </div>

          <Text24
            customCss={{
              color: "white",
              textAlign: "center",
              wordBreak: "keep-all",
            }}
          >
            {instructionData[currentIdx].text}
          </Text24>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
