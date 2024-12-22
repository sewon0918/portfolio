import { ProgramType } from "@/components/distancing/data/programData";
import { atom } from "recoil";

export interface ProgramDataType {
  [taskKey: string]: ProgramType;
}

export const programDataAtom = atom<ProgramDataType | undefined>({
  key: "programData",
  default: undefined,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = localStorage.getItem("programData");
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem("programData");
        } else {
          localStorage.setItem("programData", JSON.stringify(newValue));
        }
      });
    },
  ],
});
