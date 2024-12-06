import { Route, Routes, useLocation } from "react-router";
import RouteTransition from "./RouteTransition.tsx";
import Test from "../pages/Test.tsx";
import Home from "../pages/Home.tsx";
import AnxyHome from "@/pages/anxy/AnxyHome.tsx";
import Community from "@/pages/anxy/Community.tsx";
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect } from "react";

const ServiceRouter = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(prevLocation?.pathname);
  }, [prevLocation]);

  const showHeader = location.pathname.startsWith("/anxy");

  return (
    <>
      {/* <Routes location={location}>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <RouteTransition
        location={location}
        duration={showHeader ? 300 : 300}
        showHeader={showHeader}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="anxy">
            <Route index element={<AnxyHome />} />
            <Route path="community" element={<Community />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
      </RouteTransition>
    </>
  );
};

export default ServiceRouter;
