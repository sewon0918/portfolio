import { atom } from "recoil";

export interface ProgramType {
  activityList: {
    progressRate: number;
    isLock: boolean;
    isFirstUnlocked: boolean;
    isFirstComplete: boolean;
    activityId: string;
  }[];
  seedBox?: {
    rewardType: string;
    rewardAmount: number;
    seedCount: number;
    message: string;
    seedBoxId: string;
  };
}
export const dailyProgramDetail_mock = {
  activityList: [
    {
      progressRate: 0,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "1",
    },
    {
      progressRate: 0,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "2",
    },
  ],
};
export const dailyProgramDetail_mock2 = {
  activityList: [
    {
      progressRate: 100,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "1",
    },
    {
      progressRate: 0,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "2",
    },
  ],
};
export const dailyProgramDetail_mock3 = {
  activityList: [
    {
      progressRate: 100,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "1",
    },
    {
      progressRate: 100,
      isLock: false,
      isFirstUnlocked: false,
      isFirstComplete: false,
      activityId: "2",
    },
  ],
};
export const initialData = {
  activityList: [],
};

const programAtom = atom<ProgramType>({
  key: "program",
  default: dailyProgramDetail_mock,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = localStorage.getItem("program");
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem("program");
        } else {
          localStorage.setItem("program", JSON.stringify(newValue));
        }
      });
    },
  ],
});

export default programAtom;