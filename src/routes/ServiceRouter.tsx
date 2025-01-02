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
import { useLayout } from "@/hooks/useLayout.ts";
import InsideHome from "@/pages/inside/InsideHome.tsx";
import Inside from "@/pages/project/Inside.tsx";
import { useEffect } from "react";
import { isMobileVersion } from "@/utils/isMobileVersion.ts";
import OtherProjects from "@/pages/OtherProjects.tsx";
import Grounding from "@/pages/anxy/Grounding.tsx";

const ServiceRouter = () => {
  const location = useLocation();

  const { showHeader } = useLayout();

  const showTransition =
    isMobileVersion &&
    (location.pathname.startsWith("/anxy") ||
      location.pathname.startsWith("/distancing"));

  useEffect(() => {
    const body = document.body;
    body.style.position = "fixed";
    body.style.overflow = "hidden";
  }, []);

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <RouteTransition
        location={location}
        duration={showTransition ? 0.2 : 0}
        showHeader={showHeader}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/anxy" element={<Anxy />} />
          <Route path="/project/distancing" element={<Distancing />} />
          <Route path="/project/inside" element={<Inside />} />
          <Route path="/anxy">
            <Route index element={<AnxyHome />} />
            <Route path="test" element={<Test />} />
            <Route path="store" element={<Store />} />
            <Route path="worry-note" element={<WorryNote />} />
            <Route path="grounding" element={<Grounding />} />
            <Route path="retrospect" element={<Retrospect />} />
          </Route>
          <Route path="/distancing/:taskKey?">
            <Route index element={<DistancingHome />} />
          </Route>
          <Route path="/inside/:state">
            <Route index element={<InsideHome />} />
          </Route>
          <Route path="/project/others" element={<OtherProjects />} />
        </Routes>
      </RouteTransition>
    </>
  );
};

export default ServiceRouter;
