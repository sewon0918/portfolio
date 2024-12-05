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
}: {
  location: Location<any>;
  children: React.ReactNode;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const TIMEOUT = 300; // 애니메이션 지속 시간(ms)
  const [isPopTransition] = useState<boolean>(false);

  const [zIndex, setZIndex] = useState<number>(1); // 초기 z-index

  useEffect(() => {
    setZIndex((prevZIndex) => prevZIndex + 1); // location이 변경될 때마다 z-index 증가
  }, [location]);

  const getTransitionStyles: {
    [key in TransitionStatus]: React.CSSProperties;
  } = {
    unmounted: {
      // opacity: 1,
    },
    entering: {
      transform: `translateX(${isPopTransition ? -100 : 100}%)`,
      // opacity: 1,
    },
    entered: {
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
      // opacity: 1,
    },
    exiting: {
      transform: "translateX(-20%)",
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
      // opacity: 0,
    },
    exited: {
      transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
      // opacity: 0,
    },
  };
  return (
    <TransitionGroup component={null}>
      <Transition
        key={location.pathname} // 각 pathname에 대해 고유한 key 사용
        // timeout={0}
        timeout={{
          // appear: 0,
          enter: TIMEOUT / 10,
          exit: TIMEOUT,
        }}
        nodeRef={nodeRef}
        unmountOnExit
      >
        {(status: TransitionStatus) => (
          <div
            ref={nodeRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              ...getTransitionStyles[status],
              zIndex: zIndex,
            }}
            // key={location.pathname}
          >
            <div
              style={{
                position: "absolute",
                top: -100,
                left: 10,
                color: "red",
                fontSize: 40,
              }}
            >
              {`${status} ${location.pathname}`}
            </div>
            {children}
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default RouteTransition;
