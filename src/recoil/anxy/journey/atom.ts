import { atom, selector } from "recoil";
import { ProgramType } from "../program/atom";

interface JourneyType extends ProgramType {
  isRewardGained: boolean;
  isMileStoneClicked: boolean;
}

const journeyAtom = atom<JourneyType>({
  key: "journeyatom",
  default: undefined,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = localStorage.getItem("journey");
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));
      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem("journey");
        } else {
          localStorage.setItem("journey", JSON.stringify(newValue));
        }
      });
    },
  ],
});

export const isRewardGainedSelector = selector<boolean>({
  key: "isRewardGainedSelector",
  get: ({ get }) => {
    const state = get(journeyAtom);
    return state?.isRewardGained;
  },
  set: ({ set, get }, value) => {
    const currentState = get(journeyAtom);
    set(journeyAtom, {
      ...currentState,
      isRewardGained: value as boolean,
    });
  },
});

export const isMileStoneClickedSelector = selector<boolean>({
  key: "isMileStoneClickedSelector",
  get: ({ get }) => {
    const state = get(journeyAtom);
    return state?.isMileStoneClicked;
  },
  set: ({ set, get }, value) => {
    const currentState = get(journeyAtom);
    set(journeyAtom, {
      ...currentState,
      isMileStoneClicked: value as boolean,
    });
  },
});

export default journeyAtom;
