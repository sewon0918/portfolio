import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { ProgramContentType } from "@/components/distancing/data/BlockComponent";
import { ProgramType } from "@/components/distancing/data/programData";
import { TextareaType } from "@/components/distancing/data/CellComponent";
import { ko } from "@/components/distancing/translation/ko";
import { getTaskIdFromTaskKey } from "@/components/distancing/logic/logics";
import useGetProgramData from "./useGetProgramData";
import { cloneDeep } from "es-toolkit";
import { programDataAtom } from "@/recoil/distancing/program/atom";

export function getLatestTranslationVersion(taskId: string) {
  if (ko.task.activity && ko.task.activity[taskId]) {
    const keys = Object.keys(ko.task.activity[taskId]);
    return keys[keys.length - 1];
  }
  return;
}

export function setEditorKey(data: ProgramType) {
  (data.content as ProgramContentType[]).forEach((each) =>
    each.lines.forEach((line) =>
      line.forEach((cell) => {
        if (
          cell.type === "textarea" &&
          !(cell.content as TextareaType).editorKey
        ) {
          (cell.content as TextareaType).editorKey = uuidv4();
        }
      })
    )
  );
  return data;
}

export function setTranslationVersion(data: ProgramType) {
  if (!(data as ProgramType)["translationVersion"]) {
    (data as ProgramType)["translationVersion"] = getLatestTranslationVersion(
      data.taskId
    );
  }
  return data;
}

export function setFirstBlockShown(data: ProgramType) {
  const updatedData = {
    ...data,
    content: [
      {
        ...data.content[0],
        isShown: true,
      },
      ...data.content.slice(1),
    ],
  };

  return updatedData;
}

export function setDataWithEditorKeyAndTranslationVersion(data: ProgramType) {
  return setEditorKey(setFirstBlockShown(setTranslationVersion(data)));
}

export default function useGetBlankTaskData({ taskKey }: { taskKey: string }) {
  const [data, setData] = useState<ProgramType>();
  const programDataState = useRecoilValue(programDataAtom);
  const ProgramData = useGetProgramData(getTaskIdFromTaskKey(taskKey));

  const getDefaultRawData = () => {
    console.log("저장됨", programDataState);
    return (programDataState?.[taskKey] ||
      cloneDeep(ProgramData)) as ProgramType;
  };

  async function getRawData() {
    return getDefaultRawData();
  }

  useEffect(() => {
    getRawData().then((rawData) => {
      if (rawData) {
        console.log("RAW: ", rawData);
        setData(setDataWithEditorKeyAndTranslationVersion(rawData));
      }
    });
  }, []);

  return data;
}
