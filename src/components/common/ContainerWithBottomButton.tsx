import React from "react";
import {
  ActionButton,
  ButtonStateType,
} from "../anxy/common/button/ActionButton";
import { addAlpha } from "@/utils/helpers";

export default function ContainerWithBottomButton({
  backgroundColor = "#000000",
  children,
  buttonText,
  buttonState,
  buttonOnClick,
}: Readonly<{
  backgroundColor?: string;
  children: React.ReactNode;
  buttonText: string;
  buttonState: ButtonStateType;
  buttonOnClick: () => void;
}>) {
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",
      }}
    >
      <div css={{ flex: 1, overflow: "auto" }}>{children}</div>

      <div css={{ position: "relative" }}>
        <div
          css={{
            position: "absolute",
            top: "-20px",
            width: "100%",
            height: "20px",
            background: `linear-gradient(to top, ${backgroundColor}, ${addAlpha(
              backgroundColor,
              0
            )})`,
          }}
        ></div>
        <div css={{ padding: "0 20px", position: "relative" }}>
          <ActionButton
            state={buttonState}
            text={buttonText}
            action={buttonOnClick}
          />
        </div>
      </div>
    </div>
  );
}
