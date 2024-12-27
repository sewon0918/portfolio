import { Box } from "@mui/joy";

export default function Chip({
  color = "primary",
  label,
}: {
  color?: "primary" | "black" | "red";
  label: string;
}) {
  return (
    <Box
      sx={{
        width: "fit-content",
        px: "6px",
        py: "1px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "white",
        ...(color === "primary" && { backgroundColor: "primary.solid" }),
        ...(color === "black" && { backgroundColor: "common.black" }),
        ...(color === "red" && { backgroundColor: "#F25353" }),
      }}
    >
      {label}
    </Box>
  );
}
