import AppScreen from "@/components/common/AppScreen";
import Tabs from "@/components/anxy/Tabs";
import { useRecoilState } from "recoil";
import homeTypeAtom from "@/recoil/anxy/home/atom";
import AnxyTab from "./AnxyTab";

import WoriTab from "./WoriTab";
import { useState } from "react";

export default function AnxyHome() {
  const [homeType] = useRecoilState(homeTypeAtom);
  const [scrollTop, setScrollTop] = useState<number>(0);

  return (
    <>
      {/* <AppScreen backgroundColor="#F1EEEB" setScrollTop={setScrollTop}>
        {homeType === "wori" ? <WoriTab /> : <AnxyTab scrollTop={scrollTop} />}

        <Tabs />
      </AppScreen> */}
      <div css={{ visibility: homeType === "wori" ? "visible" : "hidden" }}>
        <AppScreen backgroundColor="#F1EEEB" setScrollTop={setScrollTop}>
          <WoriTab />

          <Tabs />
        </AppScreen>
      </div>
      <div css={{ visibility: homeType === "anxy" ? "visible" : "hidden" }}>
        <AppScreen backgroundColor="#F1EEEB" setScrollTop={setScrollTop}>
          <AnxyTab scrollTop={scrollTop} />

          <Tabs />
        </AppScreen>
      </div>
    </>
  );
}
