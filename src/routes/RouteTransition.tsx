import Header from "@/components/common/Header";
import { useEffect, useRef, useState } from "react";
import { Location } from "react-router";
import {
  TransitionGroup,
  TransitionStatus,
  Transition,
} from "react-transition-group";
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const TIMEOUT = duration; // 애니메이션 지속 시간(ms)
  const [isPopTransition, setIsPopTransition] = useState<boolean>(false);

  const [zIndex, setZIndex] = useState<number>(1); // 초기 z-index

  useEffect(() => {
    setZIndex((prevZIndex) => prevZIndex + 1); // location이 변경될 때마다 z-index 증가
  }, [location]);

  const getTransitionStyles: {
    [key in TransitionStatus]: React.CSSProperties;
  } = {
    unmounted: {},
    entering: {
      transform: `translateX(${isPopTransition ? -100 : 100}%)`,
    },
    entered: {
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    },
    exiting: {
      transform: `translateX(${isPopTransition ? 20 : -20}%)`,
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    },
    exited: {
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    },
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsPopTransition(true);
      // setTimeout(() => {
      //   setIsPopTransition(false);
      // }, TIMEOUT + 500);
    };

    if (window) {
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      {showHeader && <Header />}
      <TransitionGroup component={null}>
        <Transition
          key={location.pathname} // 각 pathname에 대해 고유한 key 사용
          timeout={{
            enter: TIMEOUT / 10,
            exit: TIMEOUT,
          }}
          nodeRef={nodeRef}
          onExited={() => {
            // transition이 끝났을 때 실행할 코드
            console.log("Transition has ended");
            setIsPopTransition(false);
          }}
        >
          {(status: TransitionStatus) => (
            <div
              ref={nodeRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                // width: "100vw",
                // height: "100vh",
                // overflow: "hidden",
                visibility: status === "exited" ? "hidden" : "visible", // 페이지 숨기기

                ...(duration > 0 && getTransitionStyles[status]),
                zIndex: zIndex,
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </div>
  );
};

export default RouteTransition;
