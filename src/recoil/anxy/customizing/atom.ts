import { atom, selector } from "recoil";

export type ItemType =
  | "badge_a"
  | "sunglasses_a"
  | "hat_a"
  | "hat_b"
  | "shoes_a"
  | "backpack_a"
  | "scarf_a";

const initialItemList = [
  "backpack_a",
  // "badge_a",
  // "hat_a",
  // "scarf_a",
  // "shoes_a",
  // "sunglasses_a",
] as ItemType[];

const customizingAtom = atom<{ itemList: ItemType[]; seedCount: number }>({
  key: "customizing",
  default: { itemList: initialItemList, seedCount: 10 },
});

export const addItemSelector = selector<ItemType[]>({
  key: "addItemSelector",
  get: ({ get }) => {
    const state = get(customizingAtom);
    return state.itemList;
  },
  set: ({ set, get }, newItem) => {
    const currentState = get(customizingAtom);
    set(customizingAtom, {
      ...currentState,
      itemList: [...currentState.itemList, ...(newItem as ItemType[])], // 이전 상태에 새 아이템 추가
    });
  },
});

export const addSeedSelector = selector<number>({
  key: "addSeedSelector",
  get: ({ get }) => {
    const state = get(customizingAtom);
    return state.seedCount;
  },
  set: ({ set, get }, count) => {
    const currentState = get(customizingAtom);
    set(customizingAtom, {
      ...currentState,
      seedCount: currentState.seedCount + (count as number),
    });
  },
});
export const subtractSeedSelector = selector<number>({
  key: "subtractSeedSelector",
  get: ({ get }) => {
    const state = get(customizingAtom);
    return state.seedCount;
  },
  set: ({ set, get }, count) => {
    const currentState = get(customizingAtom);
    set(customizingAtom, {
      ...currentState,
      seedCount: currentState.seedCount - (count as number),
    });
  },
});

export default customizingAtom;
