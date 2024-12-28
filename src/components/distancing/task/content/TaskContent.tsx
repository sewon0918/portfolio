import { useCallback, useEffect, useRef, useState } from "react";
import {
  getLastShownIndex,
  isBlockUserFieldFilled,
} from "@/components/distancing/logic/logics";
import { CircularProgress, Sheet, Stack } from "@mui/joy";
import { ProgramContentType } from "../../../../data/distancing/BlockComponent";
import useSaveContentData from "@/hooks/distancing/useSaveContentData";
import { usePrevious } from "@toss/react";
import Block from "./block/Block";
import { cloneDeep, isEqual } from "es-toolkit";

export default function TaskContent({
  taskKey,
  data,
  setData,
  moveToIndex,
  setMoveToIndex,
  isDone,
  translationVersion,
}: {
  taskKey: string;
  data?: ProgramContentType[];
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  moveToIndex?: number;
  setMoveToIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isDone?: boolean;
  translationVersion?: string;
}) {
  //변경사항 있을 때 저장
  useSaveContentData({
    taskKey,
    data,
    translationVersion,
  });
  const lastIndex = getLastShownIndex(data);

  const [, setCurrentIndex] = useState<number>(lastIndex);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>();

  const previousData = usePrevious(data);

  const blockRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      if (previousData) {
        const changedIndex = data.findIndex((element, index) =>
          isEqual(element, previousData[index])
        );
        if (changedIndex > -1) {
          setCurrentIndex(changedIndex);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    function getShownNumber(data: ProgramContentType[]) {
      return (data as ProgramContentType[]).filter(
        (element) => element.isShown && !element.isHidden
      ).length;
    }

    if (
      previousData &&
      data &&
      ((lastIndex === data.length - 1 && !isDone) ||
        (lastIndex < data.length - 1 &&
          (!data[lastIndex + 1].isShown || data[lastIndex + 1].isHidden))) &&
      !isEqual(previousData, data) &&
      getShownNumber(previousData) > 0 &&
      getShownNumber(previousData) < getShownNumber(data)
    ) {
      setMoveToIndex(lastIndex);
    }
  }, [taskKey, data, previousData, lastIndex]);

  const openNextBlock = useCallback(
    (index: number) => {
      setData((data) => {
        const isLastBlock = index === (data || []).length - 1;
        if (data) {
          if (
            // isBlockUserFieldFilled(data[index], data, user) &&
            !isLastBlock
          ) {
            const data_temp = cloneDeep(data);
            const nextBlockIndex = data_temp.findIndex(
              (element, blockIndex) =>
                blockIndex > index &&
                element.blockId &&
                element.blockId === data_temp[index].nextBlockId
            );
            if (nextBlockIndex > -1) {
              data_temp[nextBlockIndex].isShown = true;
              data_temp[nextBlockIndex].isHidden = false;
            } else {
              data_temp[index + 1].isShown = true;
              data_temp[index + 1].isHidden = false;
            }
            return data_temp;
          }
          return data;
        }
        return data;
      });
    },
    [data]
  );

  const complete = useCallback(
    (index: number) => {
      (document.activeElement as HTMLElement)?.blur();
      if (data && isBlockUserFieldFilled(data[index])) {
        openNextBlock(index);
      }
    },
    [data, setData]
  );

  //엔터로 다음 블록 열기
  useEffect(() => {
    const goNext = (e: KeyboardEvent) => {
      if (
        e.code === "Enter" ||
        e.code === "NumpadEnter" ||
        e.key === "Enter" ||
        e.key === "NumpadEnter"
      ) {
        if (data && data[lastIndex] && !e.shiftKey) {
          e.preventDefault();
          complete(lastIndex);
        }
      }
    };

    window.addEventListener("keypress", goNext);
    return () => window.removeEventListener("keypress", goNext);
  }, [data, taskKey, complete, lastIndex]);

  useEffect(() => {
    if (moveToIndex !== undefined && blockRefs.current[moveToIndex]) {
      blockRefs.current[moveToIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [moveToIndex]);

  useEffect(() => {
    if (data && !containerHeight) {
      if (scrollRef.current && scrollRef.current?.offsetHeight > 0) {
        setContainerHeight(scrollRef.current?.offsetHeight);
      }
    }
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Sheet sx={{ backgroundColor: "transparent", height: "100%" }}>
        <Stack
          alignItems={"center"}
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <CircularProgress color="neutral" />
        </Stack>
      </Sheet>
    );
  }

  return (
    <div
      id="scrollContainer"
      ref={scrollRef}
      onScroll={() => {
        if (moveToIndex !== undefined) {
          setMoveToIndex(undefined);
        }
      }}
      style={{
        paddingBottom: (containerHeight || 72) / 2,
        overflowX: "hidden",
        padding: `20px 16px ${(containerHeight || 72) / 2}px 16px`,
        height: "100%",
      }}
    >
      {data.map((blockData, index) => (
        <Block
          ref={(el) => (blockRefs.current[index] = el as HTMLDivElement)}
          key={`${taskKey}_${index}`}
          taskKey={taskKey}
          setData={setData}
          blockDataStr={JSON.stringify(blockData)}
          index={index}
          complete={complete}
          isCurrentIndex={lastIndex === index}
          isDone={isDone}
          isLastIndex={index === data.length - 1}
          translationVersion={translationVersion}
        />
      ))}
    </div>
  );
}
