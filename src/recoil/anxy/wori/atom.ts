import { atom } from "recoil";

const woriAtom = atom<{ prevScore: number; score: number }>({
  key: "wori",
  default: { prevScore: 50, score: 50 },
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = localStorage.getItem("wori");
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));
      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem("wori");
        } else {
          localStorage.setItem("wori", JSON.stringify(newValue));
        }
      });
    },
  ],
});

export default woriAtom;
