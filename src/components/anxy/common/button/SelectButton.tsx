import { PressedEffect } from "@/components/common/PressedEffect";
import { useState } from "react";
import { Text17 } from "../Text";
import { useColorTheme } from "@/hooks/useColorTheme";
import { addAlpha } from "@/utils/helpers";

interface SelectButtonProps {
  selected: boolean;
  option: string;
  onClick: (option: string) => void;
  disable?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  selectedBgColor?: string;
  isFullWidth?: boolean;
}

export function SelectButton(props: SelectButtonProps) {
  const colorPalette = useColorTheme({ type: "anxy" });
  const {
    selected,
    option,
    onClick,
    disable,
    activeColor = colorPalette.orange,
    inactiveColor = colorPalette.black,
    selectedBgColor,
    isFullWidth,
  } = props;

  const [buttonDown, setButtonDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  return (
    <div css={{ width: isFullWidth ? "100%" : "fit-content" }}>
      <PressedEffect
        element={
          <div
            css={{
              height: "54px",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              backgroundColor: selected
                ? selectedBgColor || `${addAlpha(activeColor, 0.04)}`
                : "",
              border: !selected
                ? `1px solid ${addAlpha(inactiveColor, 0.1)}`
                : `1.2px solid ${activeColor}`,
              pointerEvents: disable ? "none" : "auto",
            }}
            onMouseDown={() => {
              setButtonDown(true);
            }}
            onClick={() => {
              onClick(option);
            }}
            onTouchStart={(e) => {
              if (!buttonDown) {
                setButtonDown(true);
                setTouchStartY(e.changedTouches[0].clientY);
                setTouchStartX(e.changedTouches[0].clientX);
              }
            }}
            onTouchMove={(e) => {
              if (
                Math.abs(e.changedTouches[0].clientY - touchStartY) > 10 ||
                Math.abs(e.changedTouches[0].clientX - touchStartX) > 10
              ) {
                setButtonDown(false);
              }
            }}
            onTouchEnd={(e) => {
              setButtonDown(false);

              if (
                !(
                  Math.abs(e.changedTouches[0].clientY - touchStartY) > 5 ||
                  Math.abs(e.changedTouches[0].clientX - touchStartX) > 5
                )
              ) {
                onClick(option);
              }
            }}
          >
            <Text17
              customCss={{
                color: selected ? activeColor : inactiveColor,
                ...(selected
                  ? { fontWeight: 700 }
                  : { fontWeight: 600, opacity: 0.6 }),
              }}
            >
              {option}
            </Text17>
          </div>
        }
      />
    </div>
  );
}
