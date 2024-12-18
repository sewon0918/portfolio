import { useColorTheme } from "@/hooks/useColorTheme";
import { addAlpha } from "@/utils/helpers";
import { Theme } from "@emotion/react";
import { Interpolation } from "@emotion/react";
import React, { useEffect, useState, useRef } from "react";

export type EnterKeyHint =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send";

declare module "react" {
  interface TextareaHTMLAttributes<T> extends React.HTMLAttributes<T> {
    enterKeyHint?: EnterKeyHint;
  }
}

function PlusIcon({ color }: { color: string }) {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        padding: 0,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="11" y="5" width="2" height="14" rx="1" fill={color} />
        <rect
          x="19"
          y="11"
          width="2"
          height="14"
          rx="1"
          transform="rotate(90 19 11)"
          fill={color}
        />
      </svg>
    </div>
  );
}

interface InputProps {
  backgroundColor?: string;
  inactiveColor?: string;
  activeColor?: string;
  placeholder?: string;
  autofocus?: boolean;
  value?: string;

  updateValue?: (value: string) => void;
  noBlank?: boolean;
  autoWidth?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  plusIfEmpty?: boolean;
  deleteAction?: () => void;
  deleteIfEmpty?: boolean;
  alwaysFocus?: boolean;

  fontSize?: number;
  lineHeight?: number;
  noPadding?: boolean;
  enterKeyHint?: EnterKeyHint;

  selectedBgColor?: string;
}
export const Input: React.FC<InputProps> = (props) => {
  const colorPalette = useColorTheme({ type: "anxy" });

  const {
    backgroundColor = addAlpha("#ffffff", 0),
    inactiveColor = colorPalette.black,
    activeColor = colorPalette.orange,
    placeholder,
    autofocus = false,
    value,
    updateValue,
    noBlank,
    autoWidth,
    defaultWidth = 60,
    defaultHeight = 54,
    plusIfEmpty,
    deleteIfEmpty,
    deleteAction,
    alwaysFocus = false,

    fontSize = 17,
    lineHeight = 24,
    noPadding = false,
    enterKeyHint = "done",

    selectedBgColor,
  } = props;

  const [isFocused, setFocused] = useState(autofocus);
  const [inputValue, setInputValue] = useState(value);

  const [isInvisible, setInvisible] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputHeight = lineHeight + (noPadding ? 0 : 30);

  const maxInputWidth = window.innerWidth - 40;

  useEffect(() => {
    if (isFocused && updateValue) {
      updateValue(inputValue?.trim() ?? "");
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputRef.current) {
      if (autofocus) {
        const end = inputRef.current.value.length;
        inputRef.current.setSelectionRange(end, end);
        inputRef.current.focus();
      }
      if (inputRef.current.scrollWidth > defaultWidth) {
        inputRef.current.wrap = "soft";
        inputRef.current.style.width = `${maxInputWidth}px`;
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }
  }, []);

  const styles: { [key: string]: Interpolation<Theme> } = {
    container: {
      width: "fit-content",
      position: "relative",
      display: "flex",
      // display: isInvisible ? "none" : "flex",

      border:
        isFocused || inputValue !== ""
          ? `1.2px solid ${activeColor}`
          : `1px solid ${addAlpha(inactiveColor, 0.1)}`,
      borderRadius: "12px",

      backgroundColor:
        isFocused || inputValue !== ""
          ? selectedBgColor || `${addAlpha(activeColor, 0.04)}`
          : "",
    },
    textarea: {
      padding: noPadding ? "0px" : "15px 20px",
      outline: "none",
      overflow: "visible",
      textOverflow: "ellipsis",
      scrollbarWidth: "none", // Firefox에서 스크롤바 숨기기
      WebkitOverflowScrolling: "touch", // iOS에서 스크롤링 최적화
      width: autoWidth ? defaultWidth || "60px" : "100%",
      height: `${inputRef.current?.scrollHeight || defaultHeight}px`,
      caretColor: activeColor,
      backgroundColor: backgroundColor,
      color: activeColor,
      resize: "none",
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      fontWeight: 700,
      borderWidth: 0,
      "&::placeholder": {
        color: inactiveColor,
        opacity: 0.6,
      },
    },
  };

  return (
    <div>
      <div css={styles.container}>
        {plusIfEmpty && value === "" && !isFocused && (
          <PlusIcon color={addAlpha(inactiveColor, 0.6)} />
        )}
        <textarea
          css={styles.textarea}
          enterKeyHint={enterKeyHint}
          autoComplete="off"
          rows={1}
          wrap={autoWidth ? "off" : "soft"}
          placeholder={placeholder}
          value={inputValue}
          ref={inputRef}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          onChange={(e) => {
            if (inputRef.current) {
              if (autoWidth) {
                if (
                  parseInt(
                    inputRef.current.style.width.substring(
                      0,
                      inputRef.current.style.width.length - 2
                    )
                  ) +
                    (!noPadding ? 20 : 0) >=
                  window.innerWidth - 50
                ) {
                  inputRef.current.wrap = "soft";
                  inputRef.current.style.width = `${maxInputWidth}px`;
                }
              }

              inputRef.current.style.height = `1px`;
              inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
              if (autoWidth) {
                if (
                  parseInt(
                    inputRef.current.style.height.substring(
                      0,
                      inputRef.current.style.height.length - 2
                    )
                  ) <= inputHeight
                ) {
                  inputRef.current.wrap = "off";

                  inputRef.current.style.width = `1px`;
                  inputRef.current.style.width = `${Math.min(
                    maxInputWidth,
                    Math.max(
                      defaultWidth || 0,
                      inputRef.current.scrollWidth + (!noPadding ? 20 : 0)
                    )
                  )}px`;
                }
              }
            }

            if (noBlank) {
              const noBlank = e.target.value.substring(0, 10).replace(/ /g, "");
              setInputValue(noBlank);
            } else {
              const noLineBreak = e.target.value.replace("\n", "");
              setInputValue(noLineBreak);
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.code === "Enter" ||
                e.code === "NumpadEnter" ||
                e.key === "Enter" ||
                e.key === "NumpadEnter") &&
              inputRef.current
            ) {
              e.preventDefault();

              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.blur(); // textarea 포커스 해제
                }
              }, 0);
            }
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            if (alwaysFocus && inputRef.current) {
              inputRef.current.focus();
            } else {
              setFocused(false);
              if (inputValue === "" && deleteIfEmpty) {
                setInvisible(true);
                if (deleteAction) {
                  deleteAction();
                }
              }
            }
          }}
          autoFocus={autofocus}
        />
      </div>
    </div>
  );
};
