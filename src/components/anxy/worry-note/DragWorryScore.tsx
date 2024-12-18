import { useColorTheme } from "@/hooks/useColorTheme";
import { addAlpha } from "@/utils/helpers";
import React, { useEffect, useRef, useState } from "react";

interface DragWorryScore {
  baseColor?: string;
  pathColor?: string;
  isInitialMax?: boolean;
  initialScore?: number;
  score: number;
  setScore: (score: number) => void;
  color?: string;
}

export const DragWorryScore: React.FC<DragWorryScore> = (props) => {
  const colorPalette = useColorTheme({ type: "anxy" });
  const {
    baseColor = addAlpha(colorPalette.orange, 0.1),
    pathColor = colorPalette.orange,
    score,
    setScore,
    color,
  } = props;
  const handleRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const onTouchMove = (e: TouchEvent) => {
    if (focus) {
      e.preventDefault();
      setScore(
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
    }
  };
  const onMouseMove = (e: MouseEvent) => {
    if (focus) {
      e.preventDefault();
      setScore(
        Math.max(
          0,
          Math.min(
            100,
            Math.floor(
              Math.floor(((e.clientX - 20) / (window.innerWidth - 40)) * 100)
            )
          )
        )
      );
    }
  };
  const onStart = () => {
    setFocus(true);
  };
  const onEnd = () => {
    setFocus(false);
    setScore(Math.round(score / 10) * 10);
  };

  useEffect(() => {
    handleRef.current?.addEventListener("touchmove", onTouchMove);
    handleRef.current?.addEventListener("mousemove", onMouseMove);
    window?.addEventListener("mousemove", onMouseMove);
    window?.addEventListener("mouseup", onEnd);

    return () => {
      handleRef.current?.removeEventListener("touchmove", onTouchMove);
      handleRef.current?.removeEventListener("mousemove", onMouseMove);
      window?.removeEventListener("mousemove", onMouseMove);
      window?.removeEventListener("mouseup", onEnd);
    };
  }, [focus, score]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "15px",
          color: color,
        }}
      >
        {Math.round(score / 10) * 10}
      </div>
      <div
        style={{
          width: "100%",
          height: "24px",
          borderRadius: "50px",
          paddingLeft: "22px",
          paddingRight: "22px",
          background: `linear-gradient(90deg, ${pathColor} 22px, ${baseColor} 22px)`,
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            style={{
              backgroundColor: pathColor,
              width: `${score}%`,
              height: "100%",
            }}
          />
          <div
            ref={handleRef}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: `${score}%`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 6px 8px -2px rgba(0, 0, 0, 0.2)",
            }}
            onTouchStart={onStart}
            onTouchEnd={onEnd}
            onMouseDown={onStart}
            onMouseUp={onEnd}
          >
            <svg
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="9" width="3" height="18" rx="1.5" fill="#D1D5DC" />
              <rect width="3" height="18" rx="1.5" fill="#D1D5DC" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
