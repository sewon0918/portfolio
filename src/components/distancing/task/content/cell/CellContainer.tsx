import { Sheet } from "@mui/joy";
import React from "react";

export default function CellContainer({
  readOnly,
  isCoachFieldEmpty,
  children,
}: {
  readOnly?: boolean;
  isCoachFieldEmpty?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Sheet
      sx={{
        backgroundColor: "transparent",
        position: "relative",
        width: "100%",
        ...(readOnly && { pointerEvents: "none" }),
      }}
    >
      {isCoachFieldEmpty && (
        <Sheet
          className="w-[calc(100%+2px)] h-[calc(100%+2px)] top-[-1px] left-[-1px] pointer-events-none"
          sx={{
            backgroundColor: "transparent",
            position: "absolute",
            borderWidth: "var(--joy-focus-thickness, 2)",
            borderRadius: "6px",
            borderColor: "danger.outlinedColor",
            zIndex: 1,
          }}
        />
      )}
      {children}
    </Sheet>
  );
}
