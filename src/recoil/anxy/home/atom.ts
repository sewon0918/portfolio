import { atom } from "recoil";

type HomeType = "wori" | "anxy";

const homeTypeAtom = atom<HomeType>({
  key: "homeType",
  // default: "anxy",
  default: "wori",
});

export default homeTypeAtom;
