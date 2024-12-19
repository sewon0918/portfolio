import { useEffect } from "react";
import { useRef, useState } from "react";
import { Text24 } from "../common/Text";
import { addAlpha } from "@/utils/helpers";
import { useColorTheme } from "@/hooks/useColorTheme";

export default function HighlightSentence({
  text,
  selectedSentenceList,
  setSelectedSentenceList,
  color = "#ffffff",
  readonly,
  highlightOpacity = 0.7,
}: {
  text: string;
  selectedSentenceList: string[];
  setSelectedSentenceList?: React.Dispatch<React.SetStateAction<string[]>>;
  color?: string;
  readonly?: boolean;
  highlightOpacity?: number;
}) {
  const colorPalette = useColorTheme({ type: "anxy" });
  const highlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement[]>([]);
  const [selectedIndexList, setSelectedIndexList] = useState<number[]>([]);
  const [selectedLastIdx, setSelectedLastIdx] = useState<number>(0);
  const [mode, setMode] = useState<"select" | "delete">("select");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const alreadySelectedIndexList = selectedSentenceList
      .map((sentence) =>
        Array.from(
          { length: sentence.length },
          (v, i) => text.indexOf(sentence) + i
        )
      )
      .flat();
    setSelectedIndexList(alreadySelectedIndexList);
  }, []);

  useEffect(() => {
    const sequentialIndexList: number[][] = [];
    selectedIndexList.forEach((each, index) =>
      index === 0
        ? sequentialIndexList.push([each])
        : each === selectedIndexList[index - 1] + 1
        ? sequentialIndexList[sequentialIndexList.length - 1].push(each)
        : sequentialIndexList.push([each])
    );
    const textList = sequentialIndexList
      .map((list) => list.map((index) => text[index]))
      .map((each) => each.join(""));
    const regExp = /^[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]*$/;

    if (
      textList.some(
        (element) =>
          (element && element.trim().length === 0) ||
          regExp.test(element.trim())
      )
    ) {
      setSelectedIndexList(
        sequentialIndexList
          .filter(
            (each, index) =>
              textList[index] &&
              textList[index].trim().length > 0 &&
              !regExp.test(textList[index].trim())
          )
          .flat()
      );
      if (setSelectedSentenceList) {
        setSelectedSentenceList(
          textList.filter(
            (element) =>
              element &&
              element.trim().length > 0 &&
              !regExp.test(element.trim())
          )
        );
      }
    } else {
      if (setSelectedSentenceList) {
        setSelectedSentenceList(textList);
      }
    }
  }, [selectedIndexList]);

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
    setIsDragging(true);
    const currentIdx = getIndex(getElementFromPoints(x, y));
    setSelectedLastIdx(currentIdx);
    if (selectedIndexList.includes(currentIdx)) {
      setMode("delete");
    }
    if (currentIdx >= 0 && text[currentIdx].trim().length > 0) {
      setSelectedIndexList((selectedIndexList) =>
        selectedIndexList.includes(currentIdx)
          ? selectedIndexList.filter((element) => element !== currentIdx)
          : selectedIndexList.concat(currentIdx)
      );
    }
  };

  const onMove = (x: number, y: number) => {
    if (isDragging) {
      const currentIdx = getIndex(getElementFromPoints(x, y));
      if (currentIdx >= 0) {
        setSelectedIndexList((selectedIndexList) => {
          return mode === "select"
            ? selectedIndexList.includes(currentIdx)
              ? selectedIndexList
              : [
                  ...new Set(
                    selectedIndexList.concat(
                      Array.from(
                        { length: Math.abs(selectedLastIdx - currentIdx) },
                        (v, i) =>
                          selectedLastIdx +
                          (i + 1) * (selectedLastIdx < currentIdx ? 1 : -1)
                      )
                    )
                  ),
                ]
            : selectedIndexList.filter((element) =>
                selectedLastIdx !== undefined
                  ? !Array.from(
                      { length: Math.abs(selectedLastIdx - currentIdx) },
                      (v, i) =>
                        selectedLastIdx +
                        (i + 1) * (selectedLastIdx < currentIdx ? 1 : -1)
                    ).includes(element)
                  : true
              );
        });
        setSelectedIndexList((selectedIndexList) => {
          const copied = selectedIndexList.slice();
          copied.sort((a, b) => {
            return a - b;
          });
          return copied;
        });
        setSelectedLastIdx(currentIdx);
      }
    }
  };

  const onEnd = () => {
    setIsDragging(false);
    setSelectedIndexList((selectedIndexList) => {
      const copied = selectedIndexList.slice();
      copied.sort((a, b) => {
        return a - b;
      });
      return copied;
    });
    setMode("select");
  };

  useEffect(() => {
    window?.addEventListener("mouseup", onEnd, {
      passive: false,
    });

    return () => {
      window?.removeEventListener("mouseup", onEnd);
    };
  }, [isDragging]);

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
              backgroundColor: selectedIndexList.includes(index)
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
