import { isMobileVersion } from "@/utils/isMobileVersion";
import React, { useEffect, useRef } from "react";

export default function ContentTemplate({
  children,
  setContainerHeight,
}: {
  children: React.ReactNode;
  setContainerHeight?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (setContainerHeight && containerRef.current?.offsetHeight) {
        setContainerHeight(containerRef.current?.offsetHeight);
      }
    }, 100);
  }, [containerRef.current]);

  return (
    <div
      ref={containerRef}
      css={{
        width: isMobileVersion
          ? "100vw"
          : `calc(100vw - var(--Sidebar-width, 0))`,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
}
