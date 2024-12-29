import Typography from "@mui/joy/Typography";
import { CircularProgress, Stack } from "@mui/joy";
import { TaskType } from "../task/Task";
import { LearningActivityIcon } from "../../../assets/distancing/SvgAssets";
import NestedList from "./NestedList";
import { isMobileVersion } from "@/utils/isMobileVersion";

export function RightArrow() {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="20" height="20" rx="3" fill="none" />
      <path
        d="M8 16L12 11L8 6"
        stroke="#20242B"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ActivityList({
  title,
  isInitialLoading,
  listData,
}: {
  title: string;
  isInitialLoading: boolean;
  listData?: {
    listTitle: string;
    taskList?: TaskType[];
    initiallyOpen?: boolean;
  }[];
}) {
  const dataByTitle = [
    {
      title: "배움활동지",
      icon: <LearningActivityIcon />,
    },
  ];
  const currentData = dataByTitle.find((element) => element.title === title);

  return listData && currentData ? (
    <Stack
      sx={{
        width: "100%",
        mt: "8px",
        borderRadius: "12px",
        p: "20px",
        ...(isMobileVersion && {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "divider",
        }),
      }}
      spacing={"8px"}
    >
      <Stack direction="row" alignItems={"center"} spacing={"8px"}>
        <Stack
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "3px",
          }}
          justifyContent="center"
          alignItems={"center"}
        >
          {currentData?.icon}
        </Stack>
        <Typography level="body-md" sx={{ fontWeight: 600, cursor: "pointer" }}>
          {title}
        </Typography>
      </Stack>

      {!isInitialLoading ? (
        listData.map(({ listTitle, taskList }) => (
          <NestedList
            key={listTitle}
            title={listTitle}
            {...(taskList && { taskList: taskList })}
          />
        ))
      ) : (
        <Stack
          justifyContent={"center"}
          alignItems="center"
          sx={{
            flexGrow: 1,
          }}
        >
          <CircularProgress
            sx={{
              mt: "14px",
              mx: "auto",
            }}
            color="neutral"
          />
        </Stack>
      )}
    </Stack>
  ) : (
    <></>
  );
}
