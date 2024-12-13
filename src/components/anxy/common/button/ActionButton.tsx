import React, { useState, useEffect, useRef, ReactNode } from "react";
import { addAlpha } from "@/utils/helpers";
import { useColorTheme } from "@/hooks/useColorTheme";
import { Text17 } from "../Text";

export type ButtonStateType = "ACTIVE" | "INACTIVE" | "LOADING" | "DONE";

type ThemeType = "primary";

interface ActionButtonProps {
  state?: "ACTIVE" | "INACTIVE" | "LOADING" | "DONE";
  type?: ThemeType;
  text: string | ReactNode;
  action?: () => void;
  bgColor?: string;
  size?: "small" | "large";
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    state = "ACTIVE",
    type = "primary",
    text,
    action,
    bgColor = "#ffffff",
    size = "large",
  } = props;

  const colors = useColorTheme({ type: "anxy" });

  const themeByType: {
    [key in ThemeType]: {
      activeColor: string;
      inactiveColor: string;
      borderColor: string;
      textColor: string;
    };
  } = {
    primary: {
      activeColor: colors.black,
      inactiveColor: addAlpha(colors.black, 0.2),
      textColor: "#ffffff",
      borderColor: "rgba(0,0,0,0.02)",
    },
  };
  const colorTheme = themeByType[type];

  const [buttonDown, setButtonDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [disable, setDisable] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  const blurAndAction = () => {
    if (!disable && action) {
      (document.activeElement as HTMLElement).blur();
      action();
    }
  };

  useEffect(() => {
    if (disable) {
      setTimeout(() => {
        setDisable(false);
      }, 100);
    }
  }, [disable]);

  return (
    <div
      css={{
        width: "100%",
        height: "content-fit",
        borderRadius: `${50}px`,
        backgroundColor: bgColor,
        pointerEvents: state === "ACTIVE" ? "auto" : "none",
      }}
      ref={buttonRef}
      onClick={() => console.log("click")}
    >
      <div
        css={{
          backgroundColor:
            state !== "INACTIVE"
              ? state === "ACTIVE" && !buttonDown
                ? colorTheme.activeColor
                : addAlpha(colorTheme.activeColor, 0.2)
              : colorTheme.inactiveColor,
          color:
            state !== "INACTIVE"
              ? colorTheme.textColor
              : addAlpha(colors.black, 0.4),
          boxShadow:
            colorTheme.borderColor &&
            `inset 0 0 0 1px ${colorTheme.borderColor}`,
          borderRadius: size === "small" ? "8px" : "50px",
          height: size === "small" ? "26px" : "54px",
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setButtonDown(true);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setButtonDown(false);
          blurAndAction();
        }}
        onTouchStart={(e) => {
          if (state === "ACTIVE") {
            e.preventDefault();
            e.stopPropagation();
            setButtonDown(true);
            setTouchStartY(e.changedTouches[0].clientY);
            setTouchStartX(e.changedTouches[0].clientX);
          }
        }}
        onTouchMove={(e) => {
          if (state === "ACTIVE") {
            if (
              Math.abs(e.changedTouches[0].clientY - touchStartY) > 10 ||
              Math.abs(e.changedTouches[0].clientX - touchStartX) > 10
            ) {
              setDisable(true);
            }
          }
        }}
        onTouchEnd={(e) => {
          if (state === "ACTIVE") {
            e.preventDefault();
            e.stopPropagation();
            setButtonDown(false);
            if (
              !(
                Math.abs(e.changedTouches[0].clientY - touchStartY) > 5 ||
                Math.abs(e.changedTouches[0].clientX - touchStartX) > 5
              )
            ) {
              blurAndAction();
            }
          }
        }}
        onTouchCancel={() => {
          setButtonDown(false);
        }}
        onTouchEndCapture={() => {
          setButtonDown(false);
        }}
      >
        {state !== "LOADING" &&
          state !== "DONE" &&
          (typeof text === "string" ? (
            <Text17
              customCss={{
                marginBottom: "1px",
                ...(state === "ACTIVE"
                  ? { fontWeight: 700 }
                  : { fontWeight: 600 }),
              }}
            >
              {text}
            </Text17>
          ) : (
            text
          ))}

        {state === "LOADING" && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center z-[10]">
            <div className={`flex items-center animate-spin`}>
              {
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  stroke={colorTheme.textColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5 11C21.5 12.8442 20.99 14.6525 20.0264 16.225C19.0628 17.7974 17.6831 19.0728 16.0399 19.9101C14.3967 20.7473 12.5539 21.1139 10.7154 20.9692C8.87687 20.8245 7.11415 20.1742 5.62215 19.0902C4.13014 18.0062 2.96696 16.5307 2.2612 14.8268C1.55545 13.123 1.33462 11.2572 1.62312 9.43566C1.91162 7.61414 2.69821 5.90788 3.89594 4.50552C5.09367 3.10317 6.65587 2.05934 8.40983 1.48944"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
            </div>
          </div>
        )}
        {state === "DONE" && (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center z-[10]">
            <div className="flex items-center">
              {
                <svg
                  width="19"
                  height="12"
                  viewBox="0 0 19 12"
                  fill={colorTheme.textColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.19597 3.97424C1.7994 3.58986 1.16631 3.59976 0.781932 3.99633C0.397557 4.39291 0.407449 5.026 0.804027 5.41038L2.19597 3.97424ZM7.59524 10.6L6.89926 11.3181C7.28711 11.694 7.90337 11.694 8.29121 11.3181L7.59524 10.6ZM18.196 1.71807C18.5926 1.33369 18.6024 0.700605 18.2181 0.304027C17.8337 -0.0925511 17.2006 -0.102443 16.804 0.281932L18.196 1.71807ZM0.804027 5.41038L6.89926 11.3181L8.29121 9.88193L2.19597 3.97424L0.804027 5.41038ZM8.29121 11.3181L18.196 1.71807L16.804 0.281932L6.89926 9.88193L8.29121 11.3181Z" />
                </svg>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
