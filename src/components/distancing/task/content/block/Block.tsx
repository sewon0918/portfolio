import { Box, Sheet } from "@mui/joy";
import {
  getTaskIdFromTaskKey,
  isBlockUserFieldFilled,
} from "@/components/distancing/logic/logics";
import React, { memo } from "react";
import Line from "./Line";
import { ProgramContentType } from "../../../../../data/distancing/BlockComponent";
import DoneButton from "../../header/DoneButton";
import PatientMenuBar from "./PatientMenuBar";
import { CommentArrowSvg } from "../../../../../assets/distancing/SvgAssets";

interface PropsType {
  taskKey: string;
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  blockDataStr: string;
  index: number;
  complete: (index: number) => void;
  isCurrentIndex: boolean;
  isDone?: boolean;
  isLastIndex: boolean;
  translationVersion?: string;
}

const Block = React.forwardRef<HTMLDivElement, PropsType>(
  (
    {
      taskKey,
      setData,
      blockDataStr,
      index,
      complete,
      isCurrentIndex,
      isDone,
      isLastIndex,
      translationVersion,
    }: PropsType,
    ref
  ) => {
    const blockData: ProgramContentType = {
      ...JSON.parse(blockDataStr),
    };

    const highlight = blockData && blockData.isHighlight;

    const isHidden = blockData && (blockData.isHidden || !blockData.isShown);

    return blockData ? (
      <div
        ref={ref}
        key={`${taskKey}_${index}`}
        style={{
          width: "100%",
          margin: "0 auto",
          marginBottom: "8px",
          ...{ maxWidth: "720px" },
          ...(isHidden && { display: "none" }),
          ...(!blockData.isShown && { opacity: 0.5 }),
        }}
      >
        <div
          className={`${
            blockData.indentation && "flex items-start gap-[10px]"
          }`}
        >
          {blockData.indentation && <CommentArrowSvg />}

          <Sheet
            sx={{
              position: "relative",
              width: "100%",
              ...(!blockData.noBorder
                ? {
                    backgroundColor: "white",
                    borderWidth: "1px",
                    borderColor: "divider",
                    borderRadius: "12px",
                    px: "20px",
                    py: "16px",
                  }
                : {
                    backgroundColor: "transparent",
                    py: "12px",
                    pl: "10px",
                    ...(index > 0 && { pt: "24px" }),
                  }),
            }}
            className={` ${isDone && "pointer-events-none"}`}
          >
            {highlight && (
              <Box
                sx={{
                  backgroundColor: "primary.solid",
                  width: "5px",
                  height: "calc(100% - 40px)",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translate(0, -50%)",
                }}
              ></Box>
            )}

            {blockData.lines?.map((eachLine, lineIndex) => (
              <Line
                key={`${taskKey}_line_${lineIndex}`}
                lineStr={JSON.stringify(eachLine)}
                lineIndex={lineIndex}
                taskKey={taskKey}
                setData={setData}
                blockIndex={index}
                isLastLine={lineIndex === blockData.lines.length - 1}
                translationVersion={translationVersion}
                hasDivider={
                  lineIndex === 0 &&
                  blockData.lines[lineIndex].length === 1 &&
                  blockData.lines.length > 1 &&
                  [
                    "typography",
                    "typographyFromData",
                    "thoughtmap",
                    "preset",
                    "reference",
                    "conceptItem",
                    "isolation",
                  ].includes(blockData.lines[lineIndex + 1][0].type)
                }
              />
            ))}
            {isLastIndex && (
              <Box sx={{ mt: "12px" }}>
                <DoneButton taskKey={taskKey} />
              </Box>
            )}
          </Sheet>
        </div>

        {!isLastIndex && isCurrentIndex && !blockData.noArrow && (
          <PatientMenuBar
            highlight={getTaskIdFromTaskKey(taskKey) === "0-0-A" && index === 0}
            disabled={!(isCurrentIndex && isBlockUserFieldFilled(blockData))}
            onClick={() => {
              complete(index);
            }}
          />
        )}
      </div>
    ) : (
      <div />
    );
  }
);

export default memo(Block);
