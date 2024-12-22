import { isInIframe } from "@/utils/isInIframe";
import { css, Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        user-select: none;
        -webkit-user-select: none; /* Safari */
        --header-height: 48px;
        --notch-height: 50px;
        --Sidebar-width: ${isInIframe ? `${window.innerWidth}px` : "320px"};
        --StickyHeader-height: 60px;
      }
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        box-sizing: border-box;
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: var(--primary-color);
      }
    `}
  />
);

export default GlobalStyles;
