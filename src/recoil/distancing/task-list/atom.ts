import { TaskType } from "@/components/distancing/task/Task";
import { atom } from "recoil";

const initial_taskList = [
  {
    taskKey: "0-0-A",
    taskId: "0-0-A",
    isDone: false,
    isLocked: false,
  },
  {
    taskKey: "0-1-A",
    taskId: "0-1-A",
    isDone: false,
    isLocked: true,
  },
];

export const taskListAtom = atom<TaskType[] | undefined>({
  key: "task-list",
  default: initial_taskList,
  // effects: [
  //   ({ setSelf, onSet }) => {
  //     const savedData = localStorage.getItem("task-list");
  //     // setSelf: atom 값을 설정 혹은 재설정
  //     if (savedData) setSelf(JSON.parse(savedData));

  //     // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
  //     // setSelf에 의해서는 작동하지 않음
  //     onSet((newValue, _, isReset) => {
  //       if (isReset) {
  //         localStorage.removeItem("task-list");
  //       } else {
  //         localStorage.setItem("task-list", JSON.stringify(newValue));
  //       }
  //     });
  //   },
  // ],
});
