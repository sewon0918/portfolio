import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import ServiceRouter from "./ServiceRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ServiceRouter />
    </BrowserRouter>
  </StrictMode>
);
