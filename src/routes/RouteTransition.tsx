import AppHeader from "@/components/common/AppHeader";
import { useEffect, useRef, useState } from "react";
import { Location } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const RouteTransition = ({
  location,
  children,
  duration = 300,
  showHeader = false,
}: {
  location: Location;
  children: React.ReactNode;
  duration?: number;
  showHeader?: boolean;
}) => {
  const [isBackGesture, setIsBackGesture] = useState<boolean>(false);

  const nodeRef = useRef<HTMLDivElement>(null);
  const [isPopTransition, setIsPopTransition] = useState<boolean>(false);

  const [zIndex, setZIndex] = useState<number>(1); // 초기 z-index

  useEffect(() => {
    setZIndex((prevZIndex) => prevZIndex + 1); // location이 변경될 때마다 z-index 증가
  }, [location]);

  useEffect(() => {
    const handlePopState = () => {
      setIsPopTransition(true);
    };

    if (window) {
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const touchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].pageX;
    };
    const touchMove = (e: TouchEvent) => {
      if (
        (touchStartX.current <= 20 ||
          touchStartX.current >= window.innerWidth - 20) &&
        Math.abs(e.touches[0].pageX - touchStartX.current) > 0
      ) {
        setIsBackGesture(true);
      }
    };
    const touchEnd = () => {
      touchStartX.current = 0;
    };
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {showHeader && <AppHeader />}
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          setIsPopTransition(false);
          setIsBackGesture(false);
        }}
      >
        <motion.div
          key={location.pathname}
          {...(duration > 0 &&
            !isBackGesture && {
              transition: {
                delay: 0,
                duration: isBackGesture ? 0 : duration,
                ease: [0.4, 0, 0.2, 1],
              },
              initial: { x: isPopTransition ? -300 : 300, opacity: 1 },
              animate: { x: 0, opacity: 1 },
              exit: { x: isPopTransition ? 300 : -300, opacity: 1 },
            })}
          css={{ position: "absolute", width: "100%", height: "100%" }}
        >
          <div
            ref={nodeRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",

              zIndex: zIndex,
            }}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RouteTransition;
