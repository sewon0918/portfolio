import { atom } from "recoil";

export interface CounselorSearchWizardAnswerType {
  id: string;
  answer: string | string[];
}

export const counselorSearchWizardAtom = atom<
  CounselorSearchWizardAnswerType[] | undefined
>({
  key: "counselor-search-wizard",
  default: undefined,
});
