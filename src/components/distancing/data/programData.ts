import { ProgramContentType } from "./BlockComponent";

export interface ProgramType {
  taskId: string;
  title?: string;
  content: ProgramContentType[];
  translationVersion?: string;
  thoughtRecordKey?: string;
}

export const TaskMetaData: { taskId: string; title: string }[] = [
  //0-0-A
  {
    taskId: "0-0-A",
    title: "디스턴싱 시작하기",
  },
];

export function isTaskIdValid(taskId: string) {
  const taskIndex = TaskMetaData.findIndex(
    (element) => element.taskId === taskId
  );
  return taskIndex > -1;
}
