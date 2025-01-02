import { isInIframe } from "@/utils/isInIframe";
import { useLocation } from "react-router";

export const useLayout = () => {
  const location = useLocation();
  const showHeader =
    location.pathname.startsWith("/anxy") && location.pathname !== "/anxy";
  const notchHeight = isInIframe ? "var(--notch-height)" : "0px";
  const headerHeight = showHeader ? "var(--header-height)" : "0px";
  return { showHeader, notchHeight, headerHeight };
};
