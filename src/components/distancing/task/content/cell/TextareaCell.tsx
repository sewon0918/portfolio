import { Sheet } from "@mui/joy";
import { memo, useEffect, useState } from "react";
import { ProgramContentType } from "../../../../../data/distancing/BlockComponent";
import PlainTextarea from "./textarea/PlainTextarea";
import { setProgramContentData } from "../../../logic/logics";
import { theme } from "@/styles/theme";
import { debounce } from "es-toolkit";

function TextareaCell({
  placeholder,
  initialHtmlString,
  initialValue,
  isCoachField,
  isCoach,
  blockIndex,
  readOnly,
  setData,
  lineIndex,
  cellIndex,
  editorKey,
  id,
}: {
  placeholder?: string;
  initialHtmlString?: string;
  initialValue?: string;
  isCoachField?: boolean;
  isCoach?: boolean;
  blockIndex: number;
  readOnly?: boolean;
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  lineIndex: number;
  cellIndex: number;
  editorKey?: string;
  id?: string;
}) {
  const readonly = readOnly || (isCoachField && !isCoach);
  const [currentContent, setCurrentContent] = useState<{
    htmlString?: string;
    value?: string;
  }>({ htmlString: initialHtmlString, value: initialValue });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setCurrentContent({ value: initialValue, htmlString: initialHtmlString });
  }, [initialHtmlString, initialValue]);

  const handleChange = (value: string, htmlString?: string) => {
    setProgramContentData({
      setData,
      blockIndex,
      lineIndex,
      cellIndex,
      newlyAddedData: {
        htmlString: (htmlString || "").length > 0 ? htmlString : undefined,
        value: isCoach ? value.replace(/[\n\r]+$/, "") : value,
      },
    });
  };

  const handleChangeTemp = (value: string, htmlString?: string) => {
    setCurrentContent({
      value: value,
      htmlString: htmlString,
    });
  };

  // lodash의 debounce 함수를 사용하여 디바운스 함수를 생성합니다.
  const debouncedSaveText = debounce(handleChange, 200);

  useEffect(() => {
    // text 상태가 변경될 때마다 debouncedSaveText 함수를 호출합니다.
    // if (currentContent.value) {
    debouncedSaveText(currentContent.value || "", currentContent.htmlString);
    // }

    // 컴포넌트가 언마운트될 때 디바운스 함수를 취소합니다.
    return () => debouncedSaveText.cancel();
  }, [currentContent, debouncedSaveText]);

  return (
    <Sheet
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor:
          !isCoach && isCoachField
            ? "transparent"
            : isCoach && isCoachField
            ? "background.level1"
            : "white",
        px: !isCoach && isCoachField ? 0 : "10px",
        py: !isCoach && isCoachField ? 0 : "12px",

        borderRadius: "6px",
        ...(!(!isCoach && isCoachField) && {
          boxShadow: isFocused
            ? `inset 0 0 0 1.5px ${theme.vars.palette.primary.solid}`
            : `inset 0 0 0 1px ${theme.vars.palette.divider}`,
        }),
      }}
    >
      {/* {editorKey} */}

      {
        <PlainTextarea
          placeholder={placeholder}
          initialValue={initialValue}
          handleChange={handleChangeTemp}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          editorKey={`${editorKey}`.substring(2)}
          emojiDisabled={id === "nickname"}
          readOnly={readonly}
        />
      }
    </Sheet>
  );
}

export default memo(TextareaCell);
