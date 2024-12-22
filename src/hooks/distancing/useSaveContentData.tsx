import { useEffect } from "react";
import {
  getTaskIdFromTaskKey,
  getTaskTitleFromTaskId,
} from "@/components/distancing/logic/logics";
import { usePrevious } from "@uidotdev/usehooks";

import { useSetRecoilState } from "recoil";
import { ProgramContentType } from "@/components/distancing/data/BlockComponent";
import { isEqual } from "es-toolkit";
import { programDataAtom } from "@/recoil/distancing/program/atom";

export default function useSaveContentData({
  taskKey,
  data,
  translationVersion,
}: {
  taskKey: string;
  data?: ProgramContentType[];
  translationVersion?: string;
}) {
  const previousData = usePrevious(data);

  const setProgramDataState = useSetRecoilState(programDataAtom);

  const title = getTaskTitleFromTaskId(getTaskIdFromTaskKey(taskKey));

  function save(data: ProgramContentType[]) {
    setProgramDataState({
      [getTaskIdFromTaskKey(taskKey) as string]: {
        taskId: getTaskIdFromTaskKey(taskKey),
        title: title,
        content: data || [],
        translationVersion: translationVersion,
      },
    });
  }

  useEffect(() => {
    if (data && data.length > 0) {
      if (!isEqual(previousData, data)) {
        save(data);
      }
    }
  }, [data]);
}
