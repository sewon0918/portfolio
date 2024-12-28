import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/joy";
import { ProgramContentType } from "../../../data/distancing/BlockComponent";
import { ProgramType } from "../../../data/distancing/programData";
import useGetTaskData from "@/hooks/distancing/useGetTaskData";
import TaskHeader from "./header/TaskHeader";
import TaskContent from "./content/TaskContent";

export default function Activity({ taskKey }: { taskKey: string }) {
  const [data, setData] = useState<ProgramType | undefined>();

  const [contentData, setContentData] = useState<
    ProgramContentType[] | undefined
  >();
  const { data: fetchedData } = useGetTaskData({
    taskKey: `${taskKey}`,
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);
  useEffect(() => {
    if (data) {
      setContentData(data.content);
    }
  }, [data]);

  const [moveToIndex, setMoveToIndex] = useState<number | undefined>(undefined);

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
        <TaskHeader
          taskKey={taskKey}
          contentData={contentData}
          setMoveToIndex={setMoveToIndex}
        />
      </Box>

      <Stack sx={{ flex: 1, overflow: "hidden" }}>
        <TaskContent
          taskKey={taskKey}
          data={contentData}
          setData={setContentData}
          moveToIndex={moveToIndex}
          setMoveToIndex={setMoveToIndex}
          isDone={false}
          translationVersion={data?.translationVersion}
        />
      </Stack>
    </Box>
  );
}
