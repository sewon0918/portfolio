import { Typography } from "@mui/joy";
import React from "react";
import { SxProps } from "@mui/joy/styles/types";

export default function Link({
  text,
  level,
  opacity,
  textColor,
  bold,
  startDecorator,
  endDecorator,
  noUnderline,
  onClick,
  disabled,
  customSx,
}: {
  text: string;
  level?: "body-sm";
  opacity?: number;
  textColor?: string;
  bold?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  noUnderline?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  customSx?: SxProps;
}) {
  return (
    <Typography
      textColor={textColor}
      level={level || "body-xs"}
      textAlign={"center"}
      sx={{
        opacity: opacity || 0.5,
        ...(!noUnderline && { textDecoration: undefined }),

        ...(!disabled && { cursor: "pointer" }),
        fontWeight: bold ? 500 : 400,
        ...customSx,
      }}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </Typography>
  );
}
