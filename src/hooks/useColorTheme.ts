import { useTheme } from "@emotion/react";

export const useColorTheme = ({ type }: { type: "anxy" }) => {
  const theme = useTheme();
  const colors = theme[type].colors;
  return colors;
};
