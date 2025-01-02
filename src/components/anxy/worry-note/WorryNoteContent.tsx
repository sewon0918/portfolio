import { Text15 } from "@/components/anxy/common/Text";
import { Input } from "@/components/anxy/common/Input";
import SelectWithAdditionalInput from "@/components/anxy/worry-note/SelectWithAdditionalInput";
import CategoryTitle from "@/components/anxy/worry-note/CategoryTitle";
import {
  CategoryType,
  MetaInfoType,
  UserInputType,
} from "@/pages/anxy/WorryNote";

export default function WorryNoteContent({
  metaInfo,
  userInput,
  updateInputValue,
  updateInputArray,
  updateSelectedOptions,
  updateNestedSelectedOptions,
  updateInputOptions,
  updateNestedInputOptions,
}: {
  metaInfo: MetaInfoType[];
  userInput: UserInputType;
  updateInputValue: (value: string, id: CategoryType) => void;
  updateInputArray: (value: string, id: CategoryType, index: number) => void;
  updateSelectedOptions: (selectedOptions: string[], id: CategoryType) => void;
  updateNestedSelectedOptions: (
    selectedOptions: string[],
    id: CategoryType,
    key: string
  ) => void;
  updateInputOptions: (
    inputOptions: string[],
    id: CategoryType,
    option: string[]
  ) => void;
  updateNestedInputOptions: (
    inputOptions: string[],
    id: CategoryType,
    option: {
      [key: string]: string[];
    },
    key: string
  ) => void;
}) {
  const behaviorQuestionMappingData: { [key: string]: string } = {
    avoidance: "상황을 피하거나 외면했나요?",
    preparation: "걱정하는 일이 생기지 않도록 대비했나요?",
    checking: "문제가 없는지 계속 확인했나요?",
  };

  const titleMappingData: { [key: string]: string } = {
    situation: "상황",
    bodyList: "신체",
    thought: "생각",
    behaviorListByType: "행동",
  };
  function getVisiblePlaceholders(placeholders: string[], userInput: string[]) {
    const filledIndex = userInput.findLastIndex(
      (element) => element.length > 0
    );
    return placeholders?.slice(
      0,
      filledIndex === undefined ? 1 : filledIndex + 2
    );
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        paddingBottom: "100px",
      }}
    >
      {metaInfo.map((category, categoryIndex) => (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          key={`${titleMappingData[category.id]}${categoryIndex}`}
        >
          <CategoryTitle
            title={titleMappingData[category.id]}
            categoryIndex={categoryIndex}
          />
          {category.type === "input" &&
            (typeof category.placeholder === "string" ? (
              <Input
                placeholder={category.placeholder}
                value={userInput[category.id] as string}
                updateValue={(value) => {
                  updateInputValue(value, category.id);
                }}
              />
            ) : (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {getVisiblePlaceholders(
                  category.placeholder as string[],
                  userInput[category.id] as string[]
                ).map((each, index) => (
                  <Input
                    key={each}
                    placeholder={each}
                    value={(userInput[category.id] as string[])[index]}
                    updateValue={(value) => {
                      updateInputArray(value, category.id, index);
                    }}
                  />
                ))}
              </div>
            ))}
          {category.type === "select" &&
            (Array.isArray(category.option) ? (
              <SelectWithAdditionalInput
                selectOptions={category.option || []}
                inputOptions={[""]}
                selectedOptions={userInput[category.id] as string[]}
                setSelectedOptions={(selectedOptions: string[]) => {
                  updateSelectedOptions(selectedOptions, category.id);
                }}
                setInputOptions={(inputOptions: string[]) => {
                  updateInputOptions(
                    inputOptions,
                    category.id,
                    category.option as string[]
                  );
                }}
              />
            ) : (
              Object.entries(category.option || {}).map(([key, value]) => (
                <div
                  key={key}
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Text15
                    customCss={{
                      opacity: 0.6,
                    }}
                  >
                    {behaviorQuestionMappingData[key]}
                  </Text15>
                  <SelectWithAdditionalInput
                    selectOptions={value}
                    inputOptions={[]}
                    selectedOptions={
                      (
                        userInput[category.id] as {
                          [key: string]: string[];
                        }
                      )[key]
                    }
                    setSelectedOptions={(selectedOptions: string[]) => {
                      updateNestedSelectedOptions(
                        selectedOptions,
                        category.id,
                        key
                      );
                    }}
                    setInputOptions={(inputOptions: string[]) => {
                      updateNestedInputOptions(
                        inputOptions,
                        category.id,
                        category.option as {
                          [key: string]: string[];
                        },
                        key
                      );
                    }}
                  />
                </div>
              ))
            ))}
        </div>
      ))}
    </div>
  );
}
