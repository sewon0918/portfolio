import { useRef } from "react";
import { Sheet } from "@mui/joy";
import Activity from "./Activity";
import Payment from "../payment/Payment";

export interface TaskType {
  taskKey: string;
  taskId: string;
  isDone: boolean;
  isLocked?: boolean;
}

export default function Task({ taskKey }: { taskKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Sheet
      sx={{
        backgroundColor: "background.level1",
        width: "100%",
        height: "100%",
      }}
      ref={containerRef}
    >
      {taskKey.includes("payment") ? (
        <Payment />
      ) : (
        <Activity taskKey={taskKey} />
      )}
    </Sheet>
  );
}
