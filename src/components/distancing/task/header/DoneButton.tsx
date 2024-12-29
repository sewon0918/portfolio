import { taskListAtom } from "@/recoil/distancing/task-list/atom";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
export default function DoneButton({
  taskKey,
  size,
  disabled,
}: {
  taskKey: string;
  size?: "sm" | "lg";
  disabled?: boolean;
}) {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useRecoilState(taskListAtom);

  const isDone = taskList?.find((task) => task.taskKey === taskKey)?.isDone;

  const goBack = () => {
    navigate(-1);
  };
  const updateTaskStatus = (taskKey: string) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = prevTaskList?.map((task) => {
        if (task.taskKey === taskKey) {
          // 현재 태스크의 isDone을 true로 설정
          return { ...task, isDone: true };
        }
        return task;
      });
      return updatedTaskList;
    });
  };
  const done = () => {
    updateTaskStatus(taskKey);
    goBack();
  };

  return (
    <Button size={size} onClick={done} disabled={disabled || isDone}>
      {`마치기`}
    </Button>
  );
}
