import {
  SingleSelectionType,
  TextareaType,
  CellType,
  ContentType,
} from "../data/CellComponent";
import { ProgramContentType } from "../data/BlockComponent";
import { TaskMetaData } from "../data/programData";
import { cloneDeep } from "es-toolkit";

// 바로 다음블록 열어야하는 경우
export function hasBlockUserField(data: ProgramContentType) {
  const elements = data.lines.flat();

  return elements.some(
    (each) =>
      [
        "textarea",
        "select",
        "buttongroup",
        "selfCheck",
        "audio",
        "feedback",
      ].includes(each.type) && !each.content.coach
  );
}

export function isBlockUserFieldFilled(data: ProgramContentType) {
  const elements = data.lines

    .flat()
    .filter((element) => !element.content.coach && !element.content.optional);

  const isAllTextareaFilled = elements
    .filter((element) => element.type === "textarea")
    .every(
      (each) => ((each.content as TextareaType)?.value || "").trim().length > 0
    );

  const isAllSelectFilled = elements
    .filter((element) => element.type === "select")
    .every((each) => (each.content as SingleSelectionType)?.value);

  const isAllButtonGroupClicked = elements
    .filter((element) => element.type === "buttongroup")
    .every((each) => (each.content as SingleSelectionType)?.value);

  return isAllTextareaFilled && isAllSelectFilled && isAllButtonGroupClicked;
}

export function isAllUserFieldFilled(
  data?: ProgramContentType[],
  exceptComment?: boolean
) {
  if (data && data.length > 0) {
    const reversedData = cloneDeep(data)?.reverse();
    const reversed = reversedData.findIndex((element) => element.isShown);
    const lastIndex = data.length - 1 - reversed;

    const isTempDone =
      (lastIndex < data.length &&
        data
          .slice(0, lastIndex + 1)
          .some(
            (element) => element.isShown && !element.isHidden && element.isEnd
          )) ||
      false;

    const isLastShown =
      (!data[data.length - 1].isHidden && data[data.length - 1].isShown) ||
      false;

    const lines = data
      .filter((element) => (exceptComment ? !element.isHighlight : true))
      .filter((element) =>
        isTempDone ? element.isShown && !element.isHidden : true
      )
      .slice(0, isTempDone ? lastIndex + 1 : data.length)
      .filter((element) =>
        isLastShown
          ? !element.isAlwaysHidden && element.isShown && !element.isHidden
          : true
      );

    const isAllBlockFieldFilled = lines.every((each) =>
      isBlockUserFieldFilled(each)
    );
    return (isLastShown || isTempDone) && isAllBlockFieldFilled;
  }
  return false;
}

export function getReferenceBlock(data: ProgramContentType[], blockId: string) {
  const referenceBlock = data.find(
    (element) => (element as ProgramContentType)?.blockId === blockId
  );
  return referenceBlock;
}

export function getReferenceBlockWithCellId(
  data: ProgramContentType[],
  cellId: string
) {
  const referenceBlock = data.find(
    (element) =>
      (element as ProgramContentType)?.lines
        .flat(2)
        .findIndex((element) => (element as CellType)?.content.id === cellId) >
      -1
  );
  return referenceBlock;
}

export function getReferenceCell(data: ProgramContentType[], id: string) {
  const blockList = data.filter((element) =>
    element.lines.flat().find((element) => element.content.id === id)
  );
  // const cellList: CellType[][][] = data
  //   ?.filter((element) => element.isShown || true) //id가 중복인 경우 보여진 블록만 보기(ex.meditation_time)
  //   ?.map((each) => each.lines) as CellType[][][];
  const cellList: CellType[][][] = (
    blockList.length > 1
      ? blockList.filter((element) => element.isShown && !element.isHidden)
      : blockList
  ) //id가 중복인 경우 보여진 블록만 보기(ex.meditation_time)
    ?.map((each) => each.lines) as CellType[][][];

  const filteredArray = cellList
    .flat(2)
    .filter((element) => (element as CellType)?.content.id === id);
  // const referenceData = cellList
  //   .flat(2)
  //   .find((element) => (element as CellType)?.content.id === id);
  const referenceData = filteredArray
    ? filteredArray[filteredArray.length - 1]
    : undefined;
  return referenceData;
}

export function getReferenceData(data: ProgramContentType[], id: string) {
  return getReferenceCell(data, id)?.content;
}

export function getTaskIdFromTaskKey(taskKey: string) {
  return taskKey.split(":")[0];
}
export function getRawTaskTitleFromTaskId(taskId: string) {
  const title =
    TaskMetaData.find((element) => element.taskId === taskId)?.title || "";
  return title;
}

export function getTaskTitleFromTaskId(taskKey: string) {
  const taskId = getTaskIdFromTaskKey(taskKey);

  const title =
    taskKey === "dashboard"
      ? "대시보드"
      : taskKey === "thoughtmap"
      ? "생각 그물"
      : taskKey === "valueCompass"
      ? "가치 나침반"
      : taskKey === "progress"
      ? "진행 상황"
      : taskKey === "payment"
      ? "월 이용권"
      : taskKey === "chat"
      ? "채팅"
      : getRawTaskTitleFromTaskId(taskId);

  return title;
}

export function getTaskTitleFromTaskKey(taskKey: string) {
  return getTaskIdFromTaskKey(getTaskTitleFromTaskId(taskKey));
}
export function getLastShownIndex(data?: ProgramContentType[]) {
  if (data) {
    const copy = cloneDeep(data);
    const reversedData = copy?.reverse();
    const reversed = reversedData.findIndex(
      (element) => element.isShown && !element.isHidden
    );
    const lastIndex = (data.length - 1 - reversed) % data.length;
    return lastIndex;
  } else {
    return 0;
  }
}

export function setProgramContentData({
  setData,
  blockIndex,
  lineIndex,
  cellIndex,
  newlyAddedData,
}: {
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  blockIndex: number;
  lineIndex: number;
  cellIndex: number;
  newlyAddedData: ContentType;
}) {
  setData((data) => {
    if (
      data &&
      data[blockIndex] &&
      data[blockIndex].lines &&
      data[blockIndex].lines[lineIndex] &&
      data[blockIndex].lines[lineIndex][cellIndex]
    ) {
      const data_temp = cloneDeep(data);
      const currentContent =
        data_temp[blockIndex].lines[lineIndex][cellIndex].content;

      data_temp[blockIndex].lines[lineIndex][cellIndex].content = {
        ...currentContent,
        ...newlyAddedData,
      };

      return data_temp;
    }
    return data;
  });
}