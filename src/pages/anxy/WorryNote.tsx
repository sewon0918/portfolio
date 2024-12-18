import { useEffect, useState } from "react";
import AppScreen from "@/components/common/AppScreen";
import { useColorTheme } from "@/hooks/useColorTheme";
import { Text15, Text24 } from "@/components/anxy/common/Text";
import { Input } from "@/components/anxy/common/Input";
import SelectWithAdditionalInput from "@/components/anxy/worry-note/SelectWithAdditionalInput";
import { Wori } from "@/components/anxy/Wori";
import { DragWorryScore } from "@/components/anxy/worry-note/DragWorryScore";
import { ActionButton } from "@/components/anxy/common/button/ActionButton";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import programAtom, {
  dailyProgramDetail_mock2,
} from "@/recoil/anxy/program/atom";
import CategoryTitle from "@/components/anxy/worry-note/CategoryTitle";

export default function WorryNote() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const setDailyProgramDetailRAW = useSetRecoilState(programAtom);

  type CategoryType =
    | "situation"
    | "bodyList"
    | "thought"
    | "behaviorListByType";

  interface MetaInfoType {
    id: CategoryType;
    type: "input" | "select";
    placeholder?: string | string[];
    option?: string[] | { [key: string]: string[] };
  }

  type UserInputType = {
    [key in CategoryType]: string | string[] | { [key: string]: string[] };
  };

  const initialMetaInfo: MetaInfoType[] = [
    {
      id: "situation",
      type: "input",
      placeholder: "불안감을 느낀 객관적인 상황만 적어주세요",
    },
    {
      id: "bodyList",
      type: "select",
      option: ["가슴이 답답함", "머리가 아픔", "소회가 안됨"],
    },
    {
      id: "thought",
      type: "input",
      placeholder: [
        "어떤 부정적인 예상을 했나요?",
        "일이 어떻게 전개될 거라 생각했나요?",
        "자신에게 어떤 기대를 했나요?",
      ],
    },
    {
      id: "behaviorListByType",
      type: "select",
      option: {
        avoidance: [
          "술을 마심",
          "아무 말도 하지 않음",
          "유튜브를 봄",
          "자리를 피함",
        ],
        preparation: ["밤 늦게까지 준비를 함"],
        checking: ["재차 확인을 함"],
      },
    },
  ];

  const metaInfo: MetaInfoType[] = initialMetaInfo;
  const [userInput, setUserInput] = useState<UserInputType>(
    getUserInput(metaInfo)
  );

  function getUserInput(metaInfo: MetaInfoType[]) {
    const userInput2: UserInputType = {} as UserInputType; // 초기화 변경

    for (let i = 0; i < metaInfo.length; i++) {
      const category = metaInfo[i];
      if (category.type === "input") {
        userInput2[category.id] = "";
        if (Array.isArray(category.placeholder)) {
          for (let j = 0; j < category.placeholder.length; j++) {
            userInput2[category.id] = [
              ...(userInput2[category.id] as string[]),
              "",
            ];
          }
        }
      } else if (category.type === "select") {
        if (Array.isArray(category.option)) {
          userInput2[category.id] = [];
        } else {
          userInput2[category.id] = {};
          Object.keys(category.option as { [key: string]: string[] }).forEach(
            (key) => {
              (userInput2[category.id] as { [key: string]: string[] })[key] =
                [];
            }
          );
        }
      }
    }
    return userInput2;
  }

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  const [score, setScore] = useState(50);

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

  const colorPalette = useColorTheme({ type: "anxy" });

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
    <AppScreen backgroundColor={colorPalette.oat}>
      <div css={{ height: "100%" }}>
        <div
          css={{
            padding: "12px 20px 20px 20px",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text24>{"얼마나 불안했나요?"}</Text24>
          <div
            css={{
              flex: 1,
              width: "100%",
              padding: "20px 0",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              css={{
                flex: 1,
                width: "100%",
                position: "relative",
              }}
            >
              <div
                css={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: `translateX(-50%)`,
                }}
              >
                <Wori score={score} showGuide />
              </div>
            </div>
            <DragWorryScore score={score} setScore={setScore} />
          </div>
        </div>
        {metaInfo && userInput && (
          <div>
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
                  {category.type === "input" && (
                    <div css={{ padding: "0 20px" }}>
                      {typeof category.placeholder === "string" ? (
                        <Input
                          placeholder={category.placeholder}
                          value={userInput[category.id] as string}
                          updateValue={(value) => {
                            setUserInput((state) => ({
                              ...state,
                              [category.id]: value,
                            }));
                          }}
                        />
                      ) : (
                        <div
                          css={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          {getVisiblePlaceholders(
                            category.placeholder || [],
                            userInput[category.id] as string[]
                          ).map((each, index) => (
                            <Input
                              key={each}
                              placeholder={each}
                              value={
                                (userInput[category.id] as string[])[index]
                              }
                              updateValue={(value) => {
                                setUserInput((state) => {
                                  const newState = {
                                    ...state,
                                  };
                                  (
                                    newState[
                                      category.id as keyof UserInputType
                                    ] as string[]
                                  )[index] = value as string;
                                  return newState;
                                });
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {category.type === "select" &&
                    (Array.isArray(category.option) ? (
                      <SelectWithAdditionalInput
                        selectOptions={category.option || []}
                        inputOptions={[""]}
                        selectedOptions={userInput[category.id] as string[]}
                        setSelectedOptions={(selectedOptions: string[]) => {
                          setUserInput((state) => ({
                            ...state,
                            [category.id]: selectedOptions,
                          }));
                        }}
                        setInputOptions={(inputOptions: string[]) => {
                          setUserInput((state) => ({
                            ...state,
                            [category.id]: [
                              ...(state[category.id] as string[]).filter(
                                (element) =>
                                  (category.option as string[])?.includes(
                                    element
                                  )
                              ),
                              ...inputOptions,
                            ],
                          }));
                        }}
                      />
                    ) : (
                      Object.entries(category.option || {}).map(
                        ([key, value]) => (
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
                                padding: "0 20px",
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
                              setSelectedOptions={(
                                selectedOptions: string[]
                              ) => {
                                setUserInput((state) => ({
                                  ...state,
                                  [category.id]: {
                                    ...(state[
                                      category.id as keyof UserInputType
                                    ] as { [key: string]: string[] }),
                                    [key]: selectedOptions,
                                  },
                                }));
                              }}
                              setInputOptions={(inputOptions: string[]) => {
                                setUserInput((state) => ({
                                  ...state,
                                  [category.id]: {
                                    ...(state[
                                      category.id as keyof UserInputType
                                    ] as { [key: string]: string[] }),
                                    [key]: [
                                      ...(
                                        (
                                          state[category.id] as {
                                            [key: string]: string[];
                                          }
                                        )[key] as string[]
                                      ).filter((element) =>
                                        (
                                          (
                                            category.option as {
                                              [key: string]: string[];
                                            }
                                          )[key] as string[]
                                        )?.includes(element)
                                      ),
                                      ...inputOptions,
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        )
                      )
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        css={{
          position: "fixed",
          bottom: "20px",
          left: 0,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <ActionButton
          state={"ACTIVE"}
          text={"확인"}
          action={() => {
            setDailyProgramDetailRAW(dailyProgramDetail_mock2);
            goBack();
          }}
        />
      </div>
    </AppScreen>
  );
}
