import { Route, Routes, useLocation } from "react-router";
import RouteTransition from "./RouteTransition.tsx";
import Test2 from "./Test2.tsx";
import Home from "./page/Home.tsx";

// ServiceRouter.tsx
const ServiceRouter = () => {
  const location = useLocation();
  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test2 />} />
      </Routes>
    </RouteTransition>
  );
};

export default ServiceRouter;
