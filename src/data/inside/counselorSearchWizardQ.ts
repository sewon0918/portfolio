export interface CounselorSearchWizardOptionType {
  id: string;
  text: string;
}
export interface CounselorSearchWizardQType {
  id: string;
  type: "select" | "multiple_select";
  title: string;
  options: CounselorSearchWizardOptionType[];
}

export interface NestedCounselorSearchWizardQType {
  id: string;
  category: { [key: string]: CounselorSearchWizardQType };
}
const counselorSearchWizardQ: (
  | CounselorSearchWizardQType
  | NestedCounselorSearchWizardQType
)[] = [
  {
    id: "crc-1",
    type: "select",
    title: "어디서 어려움을 겪고 있나요?",
    options: [
      { id: "crc-1_1", text: "가족" },
      { id: "crc-1_2", text: "연인" },
      { id: "crc-1_3", text: "직장" },
      { id: "crc-1_4", text: "학교" },
      { id: "crc-1_5", text: "자존감" },
      { id: "crc-1_6", text: "음식" },
      { id: "crc-1_7", text: "정체성" },
      { id: "crc-1_8", text: "중독" },
      { id: "skip", text: "조금 다른 문제가 있어요" },
    ],
  },
  {
    id: "crc-2",
    category: {
      가족: {
        id: "crc-2",
        type: "select",
        title: "가족과 어떻게 힘든가요?",
        options: [
          { id: "crc-2_1_1", text: "부부 사이에 갈등이 있어요" },
          { id: "crc-2_1_2", text: "아이 키우기 쉽지 않네요" },
          { id: "crc-2_1_3", text: "부모님과 마찰이 있어요" },
          { id: "crc-2_1_4", text: "형제 사이에 골이 깊어요" },
          { id: "skip", text: "조금 다른 문제가 있어요" },
        ],
      },
      연인: {
        id: "crc-2",
        type: "select",
        title: "연인과 어떻게 힘든가요?",
        options: [
          { id: "crc-2_2_1", text: "가치관 차이가 심해요" },
          { id: "crc-2_2_2", text: "이별했어요" },
          { id: "crc-2_2_3", text: "권태기가 온 것 같아요" },
          { id: "crc-2_2_4", text: "결혼 문제로 힘들어요" },
          { id: "skip", text: "조금 다른 문제가 있어요" },
        ],
      },
      직장: {
        id: "crc-2",
        type: "select",
        title: "직장에서 어떻게 힘든가요?",
        options: [
          { id: "crc-2_3_1", text: "상사, 동료 관계가 힘들어요" },
          { id: "crc-2_3_2", text: "업무가 과도해요" },
          { id: "crc-2_3_3", text: "커리어에 대해 고민이 많아요" },
          { id: "crc-2_3_4", text: "일에 자신이 없어요" },
          { id: "skip", text: "조금 다른 문제가 있어요" },
        ],
      },
      학교: {
        id: "crc-2",
        type: "select",
        title: "학교에서 어떻게 힘든가요?",
        options: [
          { id: "crc-2_4_1", text: "친구들과 잘 어울리지 못해요" },
          { id: "crc-2_4_2", text: "진로에 대해 고민이 많아요" },
          { id: "crc-2_4_3", text: "성적 때문에 힘들어요" },
          { id: "skip", text: "조금 다른 문제가 있어요" },
        ],
      },
    },
  },
  {
    id: "crc-3",
    type: "multiple_select",
    title: "마음은 어떤가요?",
    options: [
      { id: "crc-3_1", text: "삶에 흥미가 없어요" },
      { id: "crc-3_2", text: "초조하고 예민해요" },
      { id: "crc-3_3", text: "무기력해요" },
      { id: "crc-3_4", text: "부정적인 생각이 들어요" },
      { id: "crc-3_5", text: "집중하기 어려워요" },
      { id: "crc-3_6", text: "걱정이 많아요" },
      { id: "crc-3_7", text: "자책하고 죄책감이 들어요" },
    ],
  },
  {
    id: "crc-4",
    type: "multiple_select",
    title: "몸은 어떤가요?",
    options: [
      { id: "crc-4_1", text: "쉽게 지쳐요" },
      { id: "crc-4_2", text: "잠들기가 힘들어요" },
      { id: "crc-4_3", text: "잠을 너무 많이 자요" },
      { id: "crc-4_4", text: "입맛이 없어요" },
      { id: "crc-4_5", text: "자주 두통을 느껴요" },
      { id: "crc-4_6", text: "소화가 잘 안돼요" },
      { id: "crc-4_7", text: "자주 호흡이 가빠요" },
    ],
  },
  {
    id: "crc-5",
    type: "select",
    title: "어떻게 나아지고 싶나요?",
    options: [
      { id: "crc-5_1", text: "상황을 개선할 해결책을 찾고 싶어요" },
      { id: "crc-5_2", text: "이야기를 들어줄 사람이 필요해요" },
      { id: "crc-5_3", text: "문제의 원인을 전문적으로 분석하고 싶어요" },
      { id: "skip", text: "아직 잘 모르겠어요" },
    ],
  },
  {
    id: "crc-6",
    type: "select",
    title: "누구와 이야기하고 싶나요?",
    options: [
      { id: "crc-6_1", text: "나보다 나이가 많아 경험이 많으면 좋겠어요" },
      { id: "crc-6_2", text: "나와 나이가 비슷해 공감대가 있으면 좋겠어요" },
      { id: "crc-6_3", text: "나보다 젊어 새로운 시각으로 본다면 좋겠어요" },
      { id: "skip", text: "상관 없어요" },
    ],
  },
];

export default counselorSearchWizardQ;
