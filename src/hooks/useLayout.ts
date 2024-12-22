import { useLocation } from "react-router";

export const useLayout = () => {
  const location = useLocation();
  const showHeader =
    location.pathname.startsWith("/anxy") && location.pathname !== "/anxy";
  return { showHeader };
};
