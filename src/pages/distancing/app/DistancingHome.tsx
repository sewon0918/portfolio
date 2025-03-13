import { useParams } from "react-router";
import { Sheet, Stack } from "@mui/joy";
import AppScreen from "@/components/common/AppScreen";
import Sidebar from "@/components/distancing/side-bar/SideBar";
import { extractHexColor } from "@/utils/helpers";
import { theme } from "@/styles/theme";
import Task from "@/components/distancing/task/Task";
import "@/components/distancing/translation/i18n";

export default function DistancingHome() {
  const { taskKey } = useParams();

  return (
    <AppScreen
      backgroundColor={extractHexColor(theme.vars.palette.background.level1)}
    >
      <Sheet
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          flexGrow: 0,
          whiteSpace: "pre-line",
        }}
      >
        <Sidebar isHome={!taskKey} />
        <Stack
          sx={{
            flex: 1,
            backgroundColor: "background.level1",
            fontSize: "50px",
          }}
        >
          {taskKey && <Task key={`task_${taskKey}`} taskKey={taskKey} />}
        </Stack>
      </Sheet>
    </AppScreen>
  );
}
