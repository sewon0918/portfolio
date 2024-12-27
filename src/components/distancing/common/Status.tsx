import { Stack } from "@mui/joy";
import React from "react";

const CheckIcon = () => {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.5L4 6.5L9.5 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export function Status({
  isChecked,
  checkedBackgroundColor,
}: {
  isChecked: boolean;
  checkedBackgroundColor?: string;
}) {
  return (
    <Stack
      sx={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        ...(!isChecked
          ? {
              borderWidth: "1.6px",
              borderColor: "#B6B9BC",
            }
          : {
              backgroundColor: checkedBackgroundColor || "primary.solid",
            }),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isChecked && <CheckIcon />}
    </Stack>
  );
}
