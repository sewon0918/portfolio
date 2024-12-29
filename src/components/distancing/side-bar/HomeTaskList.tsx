import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import { Stack } from "@mui/joy";
import LearningActivityList from "./LearningActivityList";
import { useRecoilValue } from "recoil";
import { taskListAtom } from "@/recoil/distancing/task-list/atom";
import { isMobileVersion } from "@/utils/isMobileVersion";

export default function HomeTaskList() {
  const taskList = useRecoilValue(taskListAtom);

  return (
    <Sheet
      sx={{
        backgroundColor: "transparent",
        ...(isMobileVersion && { px: "20px" }),
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
          {taskList && <LearningActivityList data={taskList} />}
        </Stack>
      </Box>
    </Sheet>
  );
}
