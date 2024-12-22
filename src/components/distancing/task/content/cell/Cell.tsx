import React, { memo } from "react";
import {
  TypographyType,
  TextareaType,
  ImageType,
  ContentType,
  celltype,
} from "../../../data/CellComponent";
import { ProgramContentType } from "../../../data/BlockComponent";

import { getTaskIdFromTaskKey } from "../../../logic/logics";

import { useTranslation } from "react-i18next";
import CellContainer from "./CellContainer";
import TextareaCell from "./TextareaCell";
import ImageCell from "./ImageCell";
import TypographyCell from "./TypographyCell";

function Cell({
  type,
  contentStr,
  blockIndex,
  lineIndex,
  cellIndex,
  taskKey,
  setData,
  translationVersion,
}: {
  type: celltype;
  contentStr: string;
  blockIndex: number;
  lineIndex: number;
  cellIndex: number;
  taskKey: string;
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  translationVersion?: string;
}) {
  const content: ContentType = JSON.parse(contentStr);

  const translationKey = (content as TypographyType).translationKey;

  const { t } = useTranslation("translation", {
    keyPrefix: `task.activity.${getTaskIdFromTaskKey(
      taskKey
    )}.${translationVersion}`,
  });

  const translatedText_noCommon = t(translationKey || "");

  const translatedText = !translationVersion
    ? translationKey || ""
    : (content as TypographyType)?.isLabel
    ? translationKey || ""
    : translatedText_noCommon;

  const isCoachField = content.coach;

  return (
    <CellContainer
      readOnly={isCoachField}
      isCoachFieldEmpty={
        !content.optional &&
        isCoachField &&
        (content.value || "").trim().length === 0
      }
    >
      {type === "typography" ? (
        <TypographyCell
          {...content}
          text={
            (content as TypographyType)?.translationKey
              ? translatedText
              : (content as TypographyType)?.text ||
                (content as TypographyType)?.value ||
                ""
          }
        />
      ) : type === "image" ? (
        <ImageCell taskKey={taskKey} url={(content as ImageType).imageUrl} />
      ) : type === "textarea" ? (
        <TextareaCell
          placeholder={(content as TextareaType).placeholder}
          initialHtmlString={(content as TextareaType).htmlString}
          initialValue={(content as TextareaType).value}
          isCoachField={(content as TextareaType).coach}
          setData={setData}
          lineIndex={lineIndex}
          cellIndex={cellIndex}
          blockIndex={blockIndex}
          editorKey={(content as TextareaType)?.editorKey}
          id={(content as TextareaType)?.id}
        />
      ) : (
        <div></div>
      )}
    </CellContainer>
  );
}

export default memo(Cell);
