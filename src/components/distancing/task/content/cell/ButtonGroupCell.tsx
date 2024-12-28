import { ProgramContentType } from "@/data/distancing/BlockComponent";
import {
  SingleSelectionType,
  TextareaLine,
} from "@/data/distancing/CellComponent";
import { Box, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import { cloneDeep } from "es-toolkit";
import { useEffect, useState } from "react";

export default function ButtonGroupCell({
  defaultValue,
  selectedIndex,
  blockIndex,
  options,
  setData,
  lineIndex,
  cellIndex,
}: {
  defaultValue?: string;
  selectedIndex?: number;
  blockIndex: number;
  options: string[];
  setData: React.Dispatch<
    React.SetStateAction<ProgramContentType[] | undefined>
  >;
  lineIndex: number;
  cellIndex: number;
}) {
  const [selectedOption, setSelectedOption] = useState<{
    text?: string;
    index?: number;
  }>({ text: defaultValue, index: selectedIndex });

  useEffect(() => {
    const index =
      selectedIndex !== undefined
        ? selectedIndex
        : options.findIndex((element) => element === defaultValue);

    setSelectedOption({ text: defaultValue, index: index });
  }, [defaultValue, selectedIndex]);

  // useEffect(() => {
  //   if (options.length === 1) {
  //     setSelected(options[0]);
  //     handleChange(options[0], 0);
  //   }
  // }, [options]);

  //직접 클릭한 게 아닌 경우 (생기지에서 명훈지 저장, 명훈지에서 생기지 저장)
  useEffect(() => {
    handleChangeFirst(selectedOption.text, selectedOption.index);
  }, [selectedOption]);

  const handleChangeFirst = (selected?: string, optionIndex?: number) => {
    setData((data) => {
      if (data) {
        const originalCurrentContent = (data[blockIndex].lines[lineIndex][
          cellIndex
        ].content || {}) as SingleSelectionType;

        const data_temp = cloneDeep(data);
        if (
          selected &&
          optionIndex !== undefined &&
          originalCurrentContent.options
        ) {
          const currentContent =
            data_temp[blockIndex].lines[lineIndex][cellIndex].content || {};
          data_temp[blockIndex].lines[lineIndex][cellIndex].content = {
            ...currentContent,
            value: selected,
            selectedIndex: optionIndex,
          };
        }

        return data_temp;
      }

      return data;
    });
  };

  const handleChange = (selected?: string, optionIndex?: number) => {
    setData((data) => {
      if (data) {
        const originalCurrentContent = (data[blockIndex].lines[lineIndex][
          cellIndex
        ].content || {}) as SingleSelectionType;

        const data_temp = cloneDeep(data);
        if (
          selected &&
          optionIndex !== undefined &&
          originalCurrentContent.options
        ) {
          const selectedOption = originalCurrentContent.options[optionIndex];
          const subjectiveOption = selectedOption.subjectiveOption;
          if (subjectiveOption) {
            const subjectiveOptionIndex = data_temp[blockIndex].lines.findIndex(
              (line) =>
                line.find((cell) => cell.content.id === subjectiveOption.id)
            );
            data_temp[blockIndex].lines.splice(
              subjectiveOptionIndex > -1
                ? subjectiveOptionIndex
                : data_temp[blockIndex].lines.length,
              subjectiveOptionIndex > -1 ? 1 : 0,
              TextareaLine(selectedOption.subjectiveOption)
            );
          } else {
            const hideCellId = originalCurrentContent.options.find(
              (element) => element.subjectiveOption
            )?.subjectiveOption?.id;
            if (hideCellId) {
              const hideCellIndex = data_temp[blockIndex].lines.findIndex(
                (line) => line.find((cell) => cell.content.id === hideCellId)
              );
              if (hideCellIndex > -1) {
                data_temp[blockIndex].lines.splice(hideCellIndex, 1);
              }
            }
          }
        }
        const currentContent =
          data_temp[blockIndex].lines[lineIndex][cellIndex].content || {};
        data_temp[blockIndex].lines[lineIndex][cellIndex].content = {
          ...currentContent,
          value: selected,
          selectedIndex: optionIndex,
        };

        return data_temp;
      }

      return data;
    });
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        width: "100%",
        whiteSpace: "nowrap",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {options.map((option, optionIndex) => (
        <Box
          key={`buttongroup_option_${blockIndex}_${lineIndex}_${cellIndex}_${optionIndex}`}
          sx={{ flexGrow: 1 }}
        >
          <Button
            fullWidth
            size="md"
            variant={"outlined"}
            color={selectedOption.text === option ? "primary" : "secondary"}
            value={option}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const selectedText = (e?.target as HTMLElement)?.innerText;

              if (selectedOption.text !== selectedText) {
                setSelectedOption({ text: selectedText, index: optionIndex });
                handleChange(selectedText, optionIndex);
              } else {
                setSelectedOption({ text: undefined, index: undefined });
                handleChange(undefined, undefined);
              }
            }}
          >
            {option}
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
