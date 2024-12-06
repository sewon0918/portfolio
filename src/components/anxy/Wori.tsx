import React from "react";
import { motion } from "framer-motion";
import { usePrevious } from "@uidotdev/usehooks";
import { Body, Head, Legs, Pants } from "./WoriBodyParts";
import { css } from "@emotion/react";

interface WoriProps {
  score: number;
  hand?: boolean;
  hasArm?: boolean;
  showGuide?: boolean;
  bgColor?: string;
  showWoriAnimation?: boolean;
}

export const Wori: React.FC<WoriProps> = ({
  score,
  showWoriAnimation = false,
}) => {
  const previousScore = usePrevious(score);

  const duration = 0;
  const animationDuration = 0.3;

  const springConfig = {
    type: showWoriAnimation && "spring",
    stiffness: 700,
    damping: 80,
    mass: 4.1,
  };

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        width: "211px",
        height: "378px",
        position: "relative",
      })}
    >
      <div>
        <motion.div
          key={score}
          initial={{
            transform: `translateY(${
              (40 * (100 - (previousScore || score))) / 100
            }px)`,
          }}
          animate={{
            transform: `translateY(${(40 * (100 - score)) / 100}px)`,
          }}
          transition={{
            ...springConfig,
            duration: showWoriAnimation ? animationDuration : duration,
          }}
        >
          <div
            css={css({
              transform: "translateY(8px)",
              position: "relative",
            })}
          >
            <Head />
            {/* 눈썹 가리개 */}
            <motion.div
              key={score}
              css={css({
                position: "absolute",
                width: "41px",
                height: "15px",
                backgroundColor: "#171222",
                left: "50%",
                transform: "translateX(-50%)",
              })}
              initial={{
                bottom: `${54 - 9 * ((previousScore || score) / 100)}px`,
              }}
              animate={{ bottom: `${54 - 9 * (score / 100)}px` }}
              transition={{
                ...springConfig,
                duration: showWoriAnimation ? animationDuration : duration,
              }}
            />
          </div>
          {/* 몸통 */}
          <motion.div
            key={`${score}`}
            css={css({
              width: "100%",
              backgroundColor: "#171222",
              transform: "translateY(2px)",
            })}
            initial={{ height: `${(74 * (previousScore || score)) / 100}px` }}
            animate={{ height: `${(74 * score) / 100}px` }}
            transition={{
              ...springConfig,
              duration: showWoriAnimation ? animationDuration : duration,
            }}
          />

          <Body />
        </motion.div>
      </div>
      {/* 다리 */}
      <div css={css({ position: "relative", width: "100%" })}>
        {/* 바지 */}
        <motion.div
          initial={{
            transform: `translateY(${
              -19 + (40 * (100 - (previousScore || score))) / 100
            }px)`,
          }}
          animate={{
            transform: `translateY(${-19 + (40 * (100 - score)) / 100}px)`,
          }}
          transition={{
            ...springConfig,
            duration: showWoriAnimation ? animationDuration : duration,
          }}
          css={css({
            position: "absolute",
            width: "100%",
            top: "1px",
            left: "0",
          })}
        >
          <Pants />
        </motion.div>
        <Legs />
      </div>
    </div>
  );
};
