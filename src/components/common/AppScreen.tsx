import { css } from "@emotion/react";
import { useThrottle } from "@toss/react";
import React, { useEffect, useRef } from "react";

export const isInIframe = window.self !== window.top; // iframe 안에 있는지 확인

export default function AppScreen({
  backgroundColor = "#F1EEEB",
  children,
  setScrollTop,
}: Readonly<{
  backgroundColor?: string;
  children: React.ReactNode;
  setScrollTop?: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const notchHeight = isInIframe ? "var(--notch-height)" : "0px";
  const containerRef = useRef<HTMLDivElement>(null);

  const setCurrentPosition = useThrottle(() => {
    console.log(containerRef.current?.scrollTop);

    if (containerRef.current?.scrollTop && setScrollTop) {
      setScrollTop(containerRef.current?.scrollTop);
    }
  }, 200);

  useEffect(() => {
    // setCurrentPosition();
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", setCurrentPosition);

      return () => {
        containerRef.current?.removeEventListener("scroll", setCurrentPosition);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      css={css({
        paddingTop: `calc(var(--header-height) + ${notchHeight})`,
        minHeight: "calc(100vh)",
        height: "100%",
        backgroundColor: backgroundColor,
        overflowY: "scroll",
      })}
    >
      {children}
    </div>
  );
}
