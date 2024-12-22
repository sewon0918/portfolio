import React, { useEffect, useState } from "react";
import { Textarea } from "@mui/joy";

export default function PlainTextarea({
  placeholder,
  initialValue,
  handleChange,
  isFocused,
  setIsFocused,
  editorKey,
  emojiDisabled,
  readOnly,
}: {
  placeholder?: string;
  initialValue?: string;
  handleChange: (value: string, htmlString?: string) => void;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  editorKey?: string;
  emojiDisabled?: boolean;
  readOnly?: boolean;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!isFocused) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const disabled_regex = /[^a-zA-Z0-9ㄱ-힣]/g;

  return (
    <Textarea
      key={`${editorKey}`}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => {
        let newValue = e.target.value;

        if (emojiDisabled) {
          // //이모지 제거
          // newValue = newValue.replace(emoji_regex, "");
          // // 특수문자 제거
          // newValue = newValue.replace(specialChar_regex, "");
          newValue = newValue.replace(disabled_regex, "");
        }

        setValue(newValue);
        handleChange(newValue, `<p>${newValue}</p>`);
      }}
      readOnly={readOnly}
      minRows={1}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
        // if (handleChangeWithoutDebounce) {
        //   handleChangeWithoutDebounce(`${value}`, `<p>${value}</p>`);
        // }
      }}
      sx={{
        padding: 0,
        minWidth: 0,
        minHeight: "24px",
        backgroundColor: "transparent",
        borderWidth: 0,
        boxShadow: "none",
        "--joy-focus-thickness": "0px",
        "--variant-borderWidth": "0px",
        "--Textarea-gap": "0px",
      }}
    ></Textarea>
  );
}
