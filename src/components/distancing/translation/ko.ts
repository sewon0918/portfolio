import { translation_0_0_A } from "./activity/0-0-A";

interface TranslationType {
  task: {
    activity: {
      [key: string]: { [key: string]: string | { [key: string]: string } };
    };
  };
}
export const ko: TranslationType = {
  task: {
    activity: {
      common: {
        lastCard1:
          "이번 활동은 어땠나요? 느낀 점이나 어려웠던 점, 걱정되는 점을 편하게 말씀해주세요. 없다면 화살표를 눌러 다음으로 넘어가 주세요.",
        lastCard2: "활동을 마쳤어요. [마치기]를 눌러주세요",
      },
      "0-0-A": translation_0_0_A.ko,
    },
  },
};
