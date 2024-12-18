import { useColorTheme } from "@/hooks/useColorTheme";
import { SelectButton } from "../common/button/SelectButton";
import { Input } from "../common/Input";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const generateOptionsWithId = (options: string[]) => {
  return options.map((option) => {
    return { id: uuidv4(), value: option };
  });
};
interface OptionWithId {
  id: string;
  value: string;
}

const setExtraBlankInput = (
  options: OptionWithId[],
  setOptions: React.Dispatch<React.SetStateAction<OptionWithId[]>>
) => {
  if (options.every((option) => option.value.length > 0)) {
    const newId = uuidv4();
    setOptions((options) => {
      return [...options, { id: newId, value: "" }];
    });
  } else if (options.filter((option) => option.value.length === 0).length > 1) {
    setOptions((options) => {
      return options.slice(0, -1);
    });
  }
};

export default function SelectWithAdditionalInput({
  selectOptions,
  inputOptions,
  setInputOptions,
  selectedOptions,
  setSelectedOptions,
}: {
  selectOptions: string[];
  inputOptions: string[];
  setInputOptions?: (value: string[]) => void;
  selectedOptions: string[];
  setSelectedOptions?: (value: string[]) => void;
}) {
  const colorPalette = useColorTheme({ type: "anxy" });

  const [inputOptionsWithId, setInputOptionsWithId] = useState<OptionWithId[]>(
    generateOptionsWithId(inputOptions)
  );

  useEffect(() => {
    setExtraBlankInput(inputOptionsWithId, setInputOptionsWithId);
    if (setInputOptions) {
      setInputOptions(
        inputOptionsWithId
          .map((option) => option.value)
          .filter((value) => value.length > 0)
      );
    }
  }, [inputOptionsWithId]);

  const selectAction = (option: string) => {
    if (setSelectedOptions) {
      setSelectedOptions(
        selectedOptions.includes(option)
          ? selectedOptions.filter(
              (selectedOption) => selectedOption !== option
            )
          : [...selectedOptions, option]
      );
    }
  };

  const updateInputAction = (value: string, index: number) => {
    setInputOptionsWithId((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index].value = value;
      return newOptions;
    });
  };

  return (
    <div>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {selectOptions.map((option) => (
          <SelectButton
            key={`select ${option}`}
            selected={selectedOptions && selectedOptions.includes(option)}
            option={option}
            onClick={(option) => {
              selectAction(option);
            }}
            activeColor={colorPalette.orange}
            inactiveColor={colorPalette.black}
          />
        ))}

        {inputOptionsWithId &&
          inputOptionsWithId.map(({ id, value }, index) => (
            <Input
              key={`${id}`}
              value={value}
              updateValue={(value) => {
                updateInputAction(value, index);
              }}
              activeColor={colorPalette.orange}
              inactiveColor={colorPalette.black}
              autoWidth
              plusIfEmpty
              deleteIfEmpty
              deleteAction={() => {
                setInputOptionsWithId((prevOptions) => {
                  const newInputs = [...prevOptions];
                  newInputs.splice(index, 1);
                  return newInputs;
                });
              }}
            />
          ))}
      </div>
    </div>
  );
}
