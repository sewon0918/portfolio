import { atom } from "recoil";

interface PlanType {
  price: string;
  duration: string;
  description: string;
  label?: string;
  productId: string;
}

export const planData: PlanType[] = [
  {
    price: "240,000원",
    duration: "3개월",
    description: "첫 3개월 이후, 구독은 매 월 8만 원에 자동 갱신됩니다.",
    label: "환불 보장",
    productId: "subscription1",
  },
  {
    price: "80,000원",
    duration: "1개월",
    description: "구독은 매 월 8만 원에 자동 갱신됩니다.",
    productId: "subscription2",
  },
];

export const subscriptionAtom = atom<PlanType>({
  key: "subscription",
  default: planData[0],
});
