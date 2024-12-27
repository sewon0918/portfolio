import { Route, Routes, useLocation } from "react-router";
import RouteTransition from "./RouteTransition.tsx";
import Test from "../pages/Test.tsx";
import Home from "../pages/Home.tsx";
import AnxyHome from "@/pages/anxy/AnxyHome.tsx";
import Store from "@/pages/anxy/Store.tsx";
import WorryNote from "@/pages/anxy/WorryNote.tsx";
import Retrospect from "@/pages/anxy/Retrospect.tsx";
import Anxy from "@/pages/project/Anxy.tsx";
import Distancing from "@/pages/project/Distancing.tsx";
import DistancingHome from "@/pages/distancing/DistancingHome.tsx";
import { isInIframe } from "@/utils/isInIframe";
import { useLayout } from "@/hooks/useLayout.ts";
import { usePrevious } from "@toss/react";

const ServiceRouter = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  const { showHeader } = useLayout();

  const isAppFirstEnter = prevLocation.pathname === "/";
  return (
    <>
      {/* <Routes location={location}>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <RouteTransition
        location={location}
        duration={isInIframe && !isAppFirstEnter ? 300 : 0}
        showHeader={showHeader}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/anxy" element={<Anxy />} />
          <Route path="/project/distancing" element={<Distancing />} />
          <Route path="/anxy">
            <Route index element={<AnxyHome />} />
            <Route path="test" element={<Test />} />
            <Route path="store" element={<Store />} />
            <Route path="worry-note" element={<WorryNote />} />
            <Route path="retrospect" element={<Retrospect />} />
          </Route>
          <Route path="/distancing/:taskKey?">
            <Route index element={<DistancingHome />} />
          </Route>
        </Routes>
      </RouteTransition>
    </>
  );
};

export default ServiceRouter;
