import React from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { ProgramContentType } from "../../../../data/distancing/BlockComponent";
import TaskProgressBar from "./TaskProgressBar";
import { getTaskTitleFromTaskKey } from "../../logic/logics";
import DoneButton from "./DoneButton";
import BackButton from "./BackButton";

export default function TaskHeader({
  taskKey,
  title,
  contentData,
  setMoveToIndex,
}: {
  taskKey: string;
  title?: string;
  contentData?: ProgramContentType[];
  setMoveToIndex?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const hasData = !!contentData;
  const taskTitle = getTaskTitleFromTaskKey(taskKey);

  return (
    <>
      <Stack>
        <Stack
          direction={"column"}
          sx={{
            px: 0,
            height: "var(--StickyHeader-height)",

            ...(!hasData && {
              borderBottomWidth: "1px",
              borderColor: "divider",
            }),
          }}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
            spacing={"8px"}
            sx={{
              flex: 1,
              height: "100%",
              px: "20px",
            }}
          >
            <BackButton />
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1}
              flexGrow={1}
            >
              <Stack direction="row" alignItems={"center"} spacing={2}>
                <Typography
                  level="title-md"
                  flexGrow={1}
                  sx={{
                    fontWeight: 700,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {title || taskTitle}
                </Typography>
              </Stack>
            </Stack>

            {hasData && (
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={1.5}
                sx={{ py: 0 }}
              >
                <>
                  <DoneButton taskKey={taskKey} size="sm" />
                </>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      {setMoveToIndex && <TaskProgressBar data={contentData} />}
    </>
  );
}
