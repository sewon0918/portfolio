import { useState } from "react";
import { useEffect } from "react";
import { TaskType } from "../task/Task";
import ActivityList from "./ActivityList";

export const onboardingTaskId = "0-0-A";

export default function LearningActivityList({ data }: { data: TaskType[] }) {
  const [listData, setListData] = useState<
    | {
        listTitle: string;
        taskList: TaskType[];
        initiallyOpen?: boolean;
      }[]
    | undefined
  >();

  useEffect(() => {
    if (data && data.length > 0) {
      const todoList = data.filter((element) => element.isDone);
      const doneList = data.filter((element) => !element.isDone);
      setListData([
        ...(todoList.length > 0
          ? [
              {
                listTitle: "오늘의 활동",
                taskList: todoList,
                initiallyOpen: true,
              },
            ]
          : []),
        ...(doneList.length > 0
          ? [
              {
                listTitle: "마친 활동",
                taskList: doneList,
              },
            ]
          : []),
      ]);
    }
  }, [data]);

  return (
    <>
      <ActivityList
        title={"배움활동지"}
        isInitialLoading={!data}
        listData={listData}
      />
    </>
  );
}
