import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useRef, useState } from "react";
import { Stack } from "@mui/joy";
import TaskItem from "./TaskItem";
import { UpArrowSvg } from "../../../assets/distancing/SvgAssets";
import { TaskType } from "../task/Task";

export default function NestedList({
  title,
  taskList,
}: {
  title: string;
  taskList?: TaskType[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const taskRefs = useRef<HTMLDivElement[]>([]);

  return (
    <Box>
      <Stack
        direction="row"
        spacing="8px"
        alignItems="center"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        sx={{ py: "8px", cursor: "pointer" }}
      >
        <Box
          sx={{
            ...(!isOpen && {
              transform: "rotate(180deg)",
              transformOrigin: "center",
            }),
            transition: "transform 0.2s",
          }}
        >
          <UpArrowSvg />
        </Box>
        <Typography sx={{ fontSize: "14px", opacity: 0.6 }}>{title}</Typography>
      </Stack>

      {isOpen ? (
        <Stack sx={{ pl: "15px" }} spacing={"4px"}>
          {taskList ? (
            taskList.map(({ taskKey, isDone, isLocked }, index) => (
              <Box
                key={taskKey}
                ref={(el) => (taskRefs.current[index] = el as HTMLDivElement)}
              >
                <TaskItem
                  taskKey={taskKey}
                  isDone={isDone}
                  isLocked={isLocked}
                />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
