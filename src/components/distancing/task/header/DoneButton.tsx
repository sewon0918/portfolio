import { taskListAtom } from "@/recoil/distancing/task-list/atom";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
export default function DoneButton({
  taskKey,
  size,
}: {
  taskKey: string;
  size?: "sm" | "lg";
}) {
  const navigate = useNavigate();
  const setTaskList = useSetRecoilState(taskListAtom);

  const goBack = () => {
    navigate(-1);
  };
  const updateTaskStatus = (taskKey: string) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = prevTaskList?.map((task, index) => {
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
    <Button size={size} onClick={done}>
      {`마치기`}
    </Button>
  );
}
