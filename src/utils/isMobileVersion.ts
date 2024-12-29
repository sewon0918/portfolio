import { isInIframe } from "./isInIframe";
import { isMobile } from "react-device-detect";

export const isMobileVersion = isInIframe || isMobile; // iframe 안에 있는지 확인
