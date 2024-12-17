import { useEffect, useState, memo } from "react";
import check_solid from "@/assets/anxy/common/check_solid.json";
import unlock from "@/assets/anxy/common/unlock.json";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import { useColorTheme } from "@/hooks/useColorTheme";
import { addAlpha } from "@/utils/helpers";
import Lottie from "@/components/common/Lottie";
import { replaceColor } from "lottie-colorify";

interface ActivityStateIndicatorProps {
  isLock?: boolean;
  isFirstUnlocked?: boolean;
  isCompleted?: boolean;
  isFirstComplete?: boolean;
  progressRate?: number;
  prevProgressRate?: number;
}

const ActivityStateIndicator: React.FC<ActivityStateIndicatorProps> = ({
  isLock,
  isFirstUnlocked,
  isCompleted,
  isFirstComplete,
  progressRate,
  prevProgressRate,
}) => {
  const [showUnlock, setShowUnlock] = useState(false);
  const [progress, setProgress] = useState(prevProgressRate);

  useEffect(() => {
    setProgress(progressRate);
  }, [progressRate]);
  const colorPalette = useColorTheme({ type: "anxy" });

  useEffect(() => {
    if (isFirstUnlocked) {
      const timeout = 200;
      setTimeout(() => {
        setShowUnlock(true);
      }, timeout);
    }
  }, [isFirstUnlocked]);

  const CheckIcon = () => (
    <div
      css={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorPalette.orange,
      }}
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5386 0.478021C11.8268 0.775454 11.8194 1.25027 11.522 1.53855L5.3315 7.53855C5.04062 7.82048 4.57843 7.82048 4.28754 7.53855L0.478021 3.84624C0.180587 3.55796 0.173168 3.08315 0.46145 2.78571C0.749731 2.48828 1.22455 2.48086 1.52198 2.76914L4.80952 5.95553L10.478 0.46145C10.7755 0.173168 11.2503 0.180587 11.5386 0.478021Z"
          fill="white"
        />
      </svg>
    </div>
  );

  return (
    <div
      css={{
        flexShrink: 0,
        width: "24px",
        height: "24px",
        position: "relative",
      }}
    >
      {!isLock && progress !== undefined && (
        <motion.div
          initial={{ opacity: isFirstUnlocked ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: isFirstUnlocked ? 1.4 : 0 }}
          css={{ position: "absolute", width: "100%", height: "100%" }}
        >
          <CircularProgressbar
            value={progress || 0}
            styles={{
              root: {},
              path: {
                stroke: colorPalette.orange,
                strokeWidth: 8,
                transition: `all 0.7s`,
                transformOrigin: "center center",
              },
              trail: {
                stroke: addAlpha(colorPalette.black, 0.3),
                strokeWidth: 8,
                transformOrigin: "center center",
              },
            }}
          />
        </motion.div>
      )}

      {(isFirstUnlocked || isLock) && (
        <div
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          <motion.div
            animate={{ opacity: showUnlock ? 0 : 1 }}
            transition={{ duration: 0.2, delay: showUnlock ? 1.2 : 0 }}
          >
            <Lottie
              lottieData={replaceColor("#FFFFFF", "#7d7e80", unlock)}
              autoplay={showUnlock}
              width={"30px"}
              height={"30px"}
              renderer={"canvas"}
            />
          </motion.div>
        </div>
      )}
      {(isFirstComplete || isCompleted) && (
        <div css={{ position: "absolute", width: "100%", height: "100%" }}>
          {isFirstComplete ? (
            <Lottie
              lottieData={replaceColor(
                "#2C4BEC",
                colorPalette.orange,
                check_solid
              )}
              autoplay
              width={"24px"}
              height={"24px"}
              renderer={"canvas"}
              delay={1}
            />
          ) : (
            <CheckIcon />
          )}
        </div>
      )}
    </div>
  );
};
export default memo(ActivityStateIndicator);
