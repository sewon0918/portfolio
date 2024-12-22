import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import { Stack } from "@mui/joy";
import Overview from "./Overview";
import LearningActivityList from "./LearningActivityList";
import { isInIframe } from "@/utils/isInIframe";

export default function HomeTaskList() {
  const isInappWebview = isInIframe;

  const activityList = [
    {
      taskKey: "0-0-A",
      taskId: "0-0-A",
      isDone: false,
      isLocked: false,
    },
  ];

  return (
    <Sheet
      sx={{
        backgroundColor: "transparent",
        ...(isInappWebview && { px: "20px" }),
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: 0,
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Overview />

          {activityList && <LearningActivityList data={activityList} />}
        </Stack>
      </Box>
    </Sheet>
  );
}
