import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { addAlpha } from "@/utils/helpers";
import { css, keyframes } from "@emotion/react";

interface DragWorryScoreSOS {
  baseColor?: string;
  pathColor?: string;
  score: number;
  setScore: (score: number) => void;
  setShowWoriAnimation: (showWoriAnimation: boolean) => void;
}

const orange = "#D66418";

const Handle = () => {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.25"
        d="M10 2L2 10L10 18"
        stroke="#26282C"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const DragWorryScoreSOS: React.FC<DragWorryScoreSOS> = ({
  baseColor = addAlpha(orange, 0.1),
  pathColor = orange,
  score,
  setScore,
  setShowWoriAnimation,
}) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [dragScore, setDragScore] = useState(score);
  const [isInGoGroundingRange, setInGoGroundingRange] = useState(false);
  const [whileDragging, setWhileDragging] = useState(false);
  const [focus, setFocus] = useState<boolean>(false);

  const textRef = useRef<HTMLDivElement>(null);
  const [showOrangeWaveText, setShowOrangeWaveText] = useState(false);

  useEffect(() => {
    setShowWoriAnimation(!whileDragging);
  }, [whileDragging]);

  useEffect(() => {
    setScore(dragScore);
    if (dragScore < 10) {
      if (!isInGoGroundingRange) {
        setInGoGroundingRange(true);
      }
    } else {
      setInGoGroundingRange(false);
    }
  }, [dragScore]);

  const onTouchMove = (e: TouchEvent) => {
    if (handleRef.current) {
      if (
        handleRef.current?.getBoundingClientRect().x +
          handleRef.current.offsetWidth <
          (textRef.current?.getBoundingClientRect().x ?? 0) &&
        !showOrangeWaveText
      ) {
        setShowOrangeWaveText(true);
      } else {
        setShowOrangeWaveText(false);
      }
    }

    e.preventDefault();
    setWhileDragging(true);
    setDragScore(
      Math.max(
        0,
        Math.min(
          100,
          Math.floor(
            ((e.changedTouches[0].clientX - 20) / (window.innerWidth - 40)) *
              100
          )
        )
      )
    );
  };
  const onMouseMove = (e: MouseEvent) => {
    if (focus) {
      if (handleRef.current && textRef.current) {
        if (
          handleRef.current?.getBoundingClientRect().x +
            handleRef.current.offsetWidth <
          (textRef.current?.getBoundingClientRect().x || 0)
        ) {
          setShowOrangeWaveText(true);
        } else {
          setShowOrangeWaveText(false);
        }
      }

      e.preventDefault();
      setWhileDragging(true);
      setDragScore(
        Math.max(
          0,
          Math.min(
            100,
            Math.floor(((e.clientX - 20) / (window.innerWidth - 40)) * 100)
          )
        )
      );
    }
  };

  const onDragStart = () => {
    setFocus(true);
  };
  const onDragEnd = () => {
    setShowOrangeWaveText(false);
    setFocus(false);
    setWhileDragging(false);
    if (isInGoGroundingRange) {
      setDragScore(0);
      setTimeout(() => {
        alert("go grounding");
      }, 500);
    } else {
      setDragScore(score);
    }
  };

  useEffect(() => {
    handleRef.current?.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    window?.addEventListener("mousemove", onMouseMove, {
      passive: false,
    });
    window?.addEventListener("mouseup", onDragEnd, {
      passive: false,
    });

    return () => {
      handleRef.current?.removeEventListener("touchmove", onTouchMove);
      window?.removeEventListener("mousemove", onMouseMove);
      window?.removeEventListener("mouseup", onDragEnd);
    };
  }, [focus]);

  const highlightColor = !showOrangeWaveText ? "#ffffff" : orange;
  const noneHighlightColor = addAlpha(highlightColor, 0.6);

  const springConfig = {
    type: !whileDragging && "spring",
    stiffness: 1000,
    damping: 59,
    mass: 5.1,
  };

  const containerCss = css({
    height: "32px",
    borderRadius: "50px",
    paddingLeft: "22px",
    paddingRight: "22px",
  });

  const percentageContainerCss = css({
    width: "100%",
    height: "100%",
    position: "relative",
  });

  const handleCss = css({
    zIndex: 10,
    width: "44px",
    height: "44px",
    borderRadius: "50px",
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: `${dragScore}%`,
    transform: `translate(-50%, -50%) ${
      focus || isInGoGroundingRange ? "scale(1.2)" : ""
    }`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "1px",
    transition: "transform 0.2s",
    boxShadow: "0px 6px 8px -2px rgba(0, 0, 0, 0.2)",
  });

  const slideToGrounding = keyframes`
  0% {
              background-position: 100px 0; // 시작 위치
            }
            100% {
              background-position: -100px 0; // 끝 위치
            }
`;

  const guideTextCss = css({
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "100%",
    display: "flex",
    alignItems: "center",
    animation: `${slideToGrounding} 2s linear infinite`,
    ...(isInGoGroundingRange
      ? {
          color: "#ffffff",
        }
      : {
          backgroundImage: `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, ${noneHighlightColor}),
      color-stop(0.2, ${noneHighlightColor}),
      color-stop(0.5, ${highlightColor}),
      color-stop(0.8, ${noneHighlightColor}),
      color-stop(1, ${noneHighlightColor})
    )`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: addAlpha(highlightColor, 0),
        }),
  });

  return (
    <div
      css={containerCss}
      style={{
        background: `linear-gradient(90deg, ${pathColor} 22px, ${
          isInGoGroundingRange ? addAlpha(orange, 0.6) : baseColor
        } 22px`,
      }}
    >
      <div css={percentageContainerCss}>
        <motion.div
          css={css({
            height: "100%",
            backgroundColor: pathColor,
            width: `${dragScore}%`,
          })}
          animate={{ width: `${dragScore}%` }}
          transition={{
            ...springConfig,
          }}
        />

        <div ref={textRef} css={guideTextCss}>
          밀어서 불안 낮추기
        </div>

        <motion.div
          ref={handleRef}
          css={handleCss}
          animate={{ left: `${dragScore}%` }}
          transition={{
            ...springConfig,
          }}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
        >
          <Handle />
        </motion.div>
      </div>
    </div>
  );
};
