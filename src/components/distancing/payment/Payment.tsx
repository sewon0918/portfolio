import { Box, Stack } from "@mui/joy";
import TaskHeader from "../task/header/TaskHeader";
import PaymentContent from "./PaymentContent";

export default function Payment() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: "none",
        }}
      >
        <TaskHeader taskKey={"payment"} />
      </Box>

      <Stack
        sx={{
          flex: 1,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <PaymentContent />
      </Stack>
    </Box>
  );
}
