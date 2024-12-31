import { PressedEffect } from "@/components/common/PressedEffect";
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
        action={() => {
          onClick(option);
        }}
      />
    </div>
  );
}
