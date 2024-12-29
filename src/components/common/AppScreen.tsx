import { useLayout } from "@/hooks/useLayout";
import { isInIframe } from "@/utils/isInIframe";
import { css } from "@emotion/react";
import { useThrottle } from "@toss/react";
import React, { useEffect, useRef } from "react";

export default function AppScreen({
  backgroundColor = "#F1EEEB",
  children,
  setScrollTop,
}: Readonly<{
  backgroundColor?: string;
  children: React.ReactNode;
  setScrollTop?: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const { showHeader } = useLayout();
  const notchHeight = isInIframe ? "var(--notch-height)" : "0px";
  const headerHeight = showHeader ? "var(--header-height)" : "0px";
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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        paddingTop: `calc(${headerHeight} + ${notchHeight})`,
        height: "calc(var(--vh,1vh) * 100)",
        minHeight: "calc(var(--vh.1vh) * 100)",
        // minHeight: "calc(100vh)",
        // height: "100%",
        backgroundColor: backgroundColor,
        overflowY: "scroll",
        fontFamily: "Arial, sans-serif",
      })}
    >
      {children}
    </div>
  );
}
