import { useEffect } from "react";
import { useRef, useState } from "react";
import { Text24 } from "../common/Text";
import { addAlpha } from "@/utils/helpers";
import { useColorTheme } from "@/hooks/useColorTheme";
import { isEqual } from "es-toolkit";

export default function HighlightSentence({
  text,
  setSelectedSentenceList,
  isReset,
  setIsReset,
  color = "#ffffff",
  readonly,
  highlightOpacity = 0.7,
}: {
  text: string;
  setSelectedSentenceList: React.Dispatch<React.SetStateAction<string[]>>;
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  readonly?: boolean;
  highlightOpacity?: number;
}) {
  const colorPalette = useColorTheme({ type: "anxy" });
  const highlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement[]>([]);
  const [selectedIndexList, setSelectedIndexList] = useState<number[][]>([]);
  const [firstSelectedIdx, setFirstSelectedIdx] = useState<
    number | undefined
  >();

  useEffect(() => {
    const updatedSentenceList = selectedIndexList.map((each) =>
      each.map((element) => text[element]).join("")
    );

    setSelectedSentenceList(updatedSentenceList);
  }, [selectedIndexList]);

  useEffect(() => {
    if (isReset) {
      setSelectedIndexList([]);
      setIsReset(false);
    }
  }, [isReset]);

  function getElementFromPoints(x: number, y: number) {
    return document.elementFromPoint(x, y) as HTMLDivElement;
  }

  function getIndex(target: HTMLDivElement): number {
    const index = textRef.current.findIndex(
      (each) => each.childNodes[0] === target
    );
    return index;
  }
  const onStart = (x: number, y: number) => {
    const currentIdx = getIndex(getElementFromPoints(x, y));
    if (currentIdx > -1) {
      setFirstSelectedIdx(currentIdx);
      //이미 선택된 경우 리스트애서 제거하고 다시 추가
      setSelectedIndexList((selectedIndexList) => {
        if (selectedIndexList.some((each) => each.includes(currentIdx))) {
          return [
            ...selectedIndexList.filter((each) => !each.includes(currentIdx)),
            [currentIdx],
          ];
        }
        return [...selectedIndexList, [currentIdx]];
      });
    }
  };

  const onMove = (x: number, y: number) => {
    if (firstSelectedIdx !== undefined) {
      const currentIdx = getIndex(getElementFromPoints(x, y));

      if (currentIdx >= 0) {
        const currentList = Array.from(
          { length: Math.abs(currentIdx - firstSelectedIdx) + 1 },
          (v, i) => Math.min(firstSelectedIdx, currentIdx) + i
        );
        setSelectedIndexList((selectedIndexList) => {
          const previousSelections = selectedIndexList.slice(0, -1);
          const already_selected = previousSelections.find((each) =>
            each.includes(currentIdx)
          );
          if (already_selected) {
            let updated_list = [...already_selected, ...currentList];
            const min = Math.min(...updated_list);
            const max = Math.max(...updated_list);
            updated_list = Array.from(
              { length: max - min + 1 },
              (v, i) => min + i
            );
            return [
              ...previousSelections.filter(
                (each) => !isEqual(each, already_selected)
              ),
              updated_list,
            ];
          } else {
            return [...previousSelections, currentList];
          }
        });
      }
    }
  };

  const onEnd = () => {
    setFirstSelectedIdx(undefined);
  };

  useEffect(() => {
    window?.addEventListener("mouseup", onEnd);

    return () => {
      window?.removeEventListener("mouseup", onEnd);
    };
  }, []);

  return (
    <div
      ref={highlightRef}
      css={{
        ...(readonly && { pointerEvents: "none" }),
      }}
      onTouchStart={(e) => {
        onStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }}
      onTouchMove={(e) => {
        onMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }}
      onTouchEnd={() => {
        onEnd();
      }}
      onMouseDown={(e) => {
        onStart(e.clientX, e.clientY);
      }}
      onMouseMove={(e) => {
        onMove(e.clientX, e.clientY);
      }}
      onMouseUp={() => {
        onEnd();
      }}
    >
      {text.split("").map((each, index) => (
        <div
          css={{
            display: "inline",
          }}
          key={index}
          ref={(element: HTMLDivElement) => {
            textRef.current[index] = element;
          }}
        >
          <Text24
            customCss={{
              width: "100%",
              display: "inline",
              color: color,
              backgroundColor: selectedIndexList.flat().includes(index)
                ? addAlpha(colorPalette.orange, highlightOpacity)
                : undefined,
            }}
          >
            {each}
          </Text24>
        </div>
      ))}
    </div>
  );
}
