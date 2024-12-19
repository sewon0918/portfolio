import { useEffect, useState } from "react";
import AppScreen from "@/components/common/AppScreen";
import { useColorTheme } from "@/hooks/useColorTheme";
import { useNavigate } from "react-router";
import ContainerWithBottomButton from "@/components/common/ContainerWithBottomButton";
import WoriScore from "@/components/anxy/worry-note/WoriScore";
import WorryNoteContent from "@/components/anxy/worry-note/WorryNoteContent";
import { ButtonStateType } from "@/components/anxy/common/button/ActionButton";
import useActivityDone from "@/hooks/anxy/useActivityDone";

export type CategoryType =
  | "situation"
  | "bodyList"
  | "thought"
  | "behaviorListByType";

export interface MetaInfoType {
  id: CategoryType;
  type: "input" | "select";
  placeholder?: string | string[];
  option?: string[] | { [key: string]: string[] };
}

export type UserInputType = {
  [key in CategoryType]: string | string[] | { [key: string]: string[] };
};

export default function WorryNote() {
  const colorPalette = useColorTheme({ type: "anxy" });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const completeActivity = useActivityDone();
  const [buttonState, setButtonState] = useState<ButtonStateType>("ACTIVE");
  const [score, setScore] = useState(50);

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
    getInitialUserInput(metaInfo)
  );

  function getInitialUserInput(metaInfo: MetaInfoType[]) {
    const userInput: UserInputType = {} as UserInputType; // 초기화 변경

    for (let i = 0; i < metaInfo.length; i++) {
      const category = metaInfo[i];
      if (category.type === "input") {
        userInput[category.id] = "";
        if (Array.isArray(category.placeholder)) {
          for (let j = 0; j < category.placeholder.length; j++) {
            userInput[category.id] = [
              ...(userInput[category.id] as string[]),
              "",
            ];
          }
        }
      } else if (category.type === "select") {
        if (Array.isArray(category.option)) {
          userInput[category.id] = [];
        } else {
          userInput[category.id] = {};
          Object.keys(category.option as { [key: string]: string[] }).forEach(
            (key) => {
              (userInput[category.id] as { [key: string]: string[] })[key] = [];
            }
          );
        }
      }
    }
    return userInput;
  }

  useEffect(() => {
    if (ifUserInputAllFilled(userInput)) {
      setButtonState("ACTIVE");
    } else {
      setButtonState("INACTIVE");
    }
  }, [userInput]);

  function ifUserInputAllFilled(userInput: UserInputType) {
    for (let i = 0; i < metaInfo.length; i++) {
      const category = metaInfo[i];
      if (category.type === "input") {
        if (
          (typeof userInput[category.id] === "string" &&
            userInput[category.id].length === 0) ||
          (Array.isArray(userInput[category.id]) &&
            (userInput[category.id] as string[]).every(
              (element) => element.length === 0
            ))
        ) {
          return false;
        }
      } else if (category.type === "select") {
        if (
          (Array.isArray(category.option) &&
            userInput[category.id].length === 0) ||
          (!Array.isArray(category.option) &&
            Object.values(
              userInput[category.id] as { [key: string]: string[] }
            ).every((options) => options.length === 0))
        ) {
          return false;
        }
      }
    }
    return true;
  }

  const updateInputValue = (value: string, id: CategoryType) => {
    setUserInput((state) => ({
      ...state,
      [id]: value,
    }));
  };

  const updateInputArray = (value: string, id: CategoryType, index: number) => {
    setUserInput((state) => {
      const newState = {
        ...state,
      };
      (newState[id] as string[])[index] = value as string;
      return newState;
    });
  };

  const updateSelectedOptions = (
    selectedOptions: string[],
    id: CategoryType
  ) => {
    setUserInput((state) => ({
      ...state,
      [id]: selectedOptions,
    }));
  };

  const updateNestedSelectedOptions = (
    selectedOptions: string[],
    id: CategoryType,
    key: string
  ) => {
    setUserInput((state) => ({
      ...state,
      [id]: {
        ...(state[id] as { [key: string]: string[] }),
        [key]: selectedOptions,
      },
    }));
  };

  const updateInputOptions = (
    inputOptions: string[],
    id: CategoryType,
    option: string[]
  ) => {
    setUserInput((state) => ({
      ...state,
      [id]: [
        ...(state[id] as string[]).filter((element) =>
          (option as string[])?.includes(element)
        ),
        ...inputOptions,
      ],
    }));
  };

  const updateNesedInputOptions = (
    inputOptions: string[],
    id: CategoryType,
    option: {
      [key: string]: string[];
    },
    key: string
  ) => {
    setUserInput((state) => ({
      ...state,
      [id]: {
        ...(state[id as keyof UserInputType] as { [key: string]: string[] }),
        [key]: [
          ...(
            (
              state[id] as {
                [key: string]: string[];
              }
            )[key] as string[]
          ).filter((element) => (option[key] as string[])?.includes(element)),
          ...inputOptions,
        ],
      },
    }));
  };
  function submit() {
    setButtonState("LOADING");
    completeActivity("worry-note");
    setTimeout(() => {
      setButtonState("DONE");
      goBack();
    }, 200);
  }
  return (
    <AppScreen backgroundColor={colorPalette.oat}>
      <ContainerWithBottomButton
        backgroundColor={colorPalette.oat}
        buttonState={buttonState}
        buttonText="기록하기"
        buttonOnClick={submit}
      >
        <div css={{ height: "100%", padding: "0 20px" }}>
          <WoriScore score={score} setScore={setScore} />

          {metaInfo && userInput && (
            <WorryNoteContent
              metaInfo={metaInfo}
              userInput={userInput}
              updateInputValue={updateInputValue}
              updateInputArray={updateInputArray}
              updateSelectedOptions={updateSelectedOptions}
              updateNestedSelectedOptions={updateNestedSelectedOptions}
              updateInputOptions={updateInputOptions}
              updateNesedInputOptions={updateNesedInputOptions}
            />
          )}
        </div>
      </ContainerWithBottomButton>
    </AppScreen>
  );
}
