import React, { memo } from "react";
import {
  TypographyType,
  TextareaType,
  ImageType,
  ContentType,
  celltype,
  SingleSelectionType,
} from "../../../data/CellComponent";
import { ProgramContentType } from "../../../data/BlockComponent";

import { getTaskIdFromTaskKey } from "../../../logic/logics";

import { useTranslation } from "react-i18next";
import CellContainer from "./CellContainer";
import TextareaCell from "./TextareaCell";
import ImageCell from "./ImageCell";
import TypographyCell from "./TypographyCell";
import ButtonGroupCell from "./ButtonGroupCell";

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

  const { t: t_common } = useTranslation("translation", {
    keyPrefix: "task.activity.common",
  });
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
    : translationKey?.startsWith("common")
    ? t_common(translationKey?.split(":")[1] || "")
    : translatedText_noCommon;

  const translatedOptions =
    (content as SingleSelectionType)["options"]?.map((each) =>
      t(each.translationKey || "")
    ) || [];

  return (
    <CellContainer>
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
      ) : type === "buttongroup" ? (
        <ButtonGroupCell
          defaultValue={(content as SingleSelectionType).value}
          selectedIndex={(content as SingleSelectionType).selectedIndex}
          blockIndex={blockIndex}
          options={translatedOptions}
          setData={setData}
          lineIndex={lineIndex}
          cellIndex={cellIndex}
        />
      ) : (
        <div></div>
      )}
    </CellContainer>
  );
}

export default memo(Cell);
