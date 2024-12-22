import { Typography } from "@mui/joy";
import { memo } from "react";
import { levelType } from "../../../data/CellComponent";

function TypographyCell({
  text,
  level,
  color,
  opacity,
  labelIndex,
  prefixLabelIndex,
}: {
  text?: string;
  level?: levelType;
  color?: string;
  opacity?: number;
  labelIndex?: number;
  prefixLabelIndex?: number;
}) {
  return (
    <Typography
      level={level || "body-md"}
      textColor={color}
      sx={{
        opacity: opacity,
        ...(level === "h3" && {
          wordBreak: "keep-all",
        }),
        ...(level === "title-sm" && { fontWeight: 700 }),
      }}
    >
      {`${prefixLabelIndex || ""}${text} ${labelIndex || ""}`}
    </Typography>
  );
}

export default memo(TypographyCell);
