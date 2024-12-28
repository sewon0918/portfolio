import { Stack } from "@mui/joy";
import React, { memo } from "react";
import Cell from "../cell/Cell";
import { ProgramContentType } from "../../../../../data/distancing/BlockComponent";
import {
  CellType,
  TextareaType,
  TypographyType,
} from "../../../../../data/distancing/CellComponent";

function Line({
  lineStr,
  lineIndex,
  taskKey,
  setData,
  blockIndex,
  isLastLine,
  translationVersion,
  hasDivider,
}: {
  lineStr: string;
  lineIndex: number;
  taskKey: string;
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  blockIndex: number;
  isLastLine: boolean;
  translationVersion?: string;
  hasDivider?: boolean;
}) {
  const line: CellType[] = JSON.parse(lineStr);

  return (
    <div
      key={`${taskKey}_${blockIndex}_${lineIndex}`}
      className="flex gap-[10px] items-stretch w-full"
    >
      {line.map((cell, cellIndex) => (
        <Stack
          key={
            (cell.content as TextareaType)?.editorKey
              ? `${taskKey}_textarea_${
                  (cell.content as TextareaType).editorKey
                }`
              : `${taskKey}_${blockIndex}_${lineIndex}_${cellIndex}`
          }
          sx={{
            width: `${((cell.content as TypographyType)?.width || 1) * 100}%`,
            alignSelf: "stretch",

            mb: !isLastLine
              ? cell.type === "typography" &&
                (cell.content as TypographyType).isLabel
                ? "4px"
                : "12px"
              : 0,
            ...(hasDivider && {
              pb: "12px",
              borderBottomWidth: "1px",
              borderColor: "divider",
            }),
          }}
          className={`flex justify-center ${
            cell.content.readonly && "pointer-events-none"
          }`}
        >
          <Cell
            type={cell.type}
            contentStr={JSON.stringify(cell.content)}
            blockIndex={blockIndex}
            lineIndex={lineIndex}
            cellIndex={cellIndex}
            taskKey={taskKey}
            setData={setData}
            translationVersion={translationVersion}
          />
        </Stack>
      ))}
    </div>
  );
}

export default memo(Line);
