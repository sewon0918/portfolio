import { Route, Routes, useLocation } from "react-router";
import RouteTransition from "./RouteTransition.tsx";
import Test from "../pages/Test.tsx";
import Home from "../pages/Home.tsx";
import AnxyHome from "@/pages/anxy/AnxyHome.tsx";

const ServiceRouter = () => {
  const location = useLocation();
  const showHeader = location.pathname.startsWith("/anxy");

  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
      </Routes>
      <RouteTransition location={location} showHeader={showHeader}>
        <Routes location={location}>
          <Route path="anxy">
            <Route index element={<AnxyHome />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
      </RouteTransition>
    </>
  );
};

export default ServiceRouter;
