import "./index.css";
import App from "./App.tsx";
import { Route, Routes, useLocation } from "react-router";
import RouteTransition from "./RouteTransition.tsx";
import Test from "./Test.tsx";

// ServiceRouter.tsx
const ServiceRouter = () => {
  const location = useLocation();
  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </RouteTransition>
  );
};

export default ServiceRouter;
