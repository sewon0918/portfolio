import { atom } from "recoil";

type HomeType = "wori" | "anxy";

const homeTypeAtom = atom<HomeType>({
  key: "homeType",
  // default: "wori",
  default: "anxy",
});

export default homeTypeAtom;