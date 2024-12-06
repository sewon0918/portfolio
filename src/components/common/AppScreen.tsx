import { css } from "@emotion/react";
import React from "react";

export const isInIframe = window.self !== window.top; // iframe 안에 있는지 확인

export default function AppScreen({
  backgroundColor = "#F1EEEB",
  children,
}: Readonly<{
  backgroundColor?: string;
  children: React.ReactNode;
}>) {
  const notchHeight = isInIframe ? "var(--notch-height)" : "0px";

  return (
    <div
      css={css({
        paddingTop: `calc(var(--header-height) + ${notchHeight})`,
        minHeight: "calc(100vh)",
        backgroundColor: backgroundColor,
        overflowX: "hidden",
      })}
    >
      {children}
    </div>
  );
}
