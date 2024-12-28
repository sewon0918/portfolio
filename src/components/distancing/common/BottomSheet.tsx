import { theme } from "@/styles/theme";
import { extractHexColor } from "@/utils/helpers";
import { Box } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function BottomSheet({
  backgrounColor,
  isVisible,
  setIsVisible,
  children,
}: {
  backgrounColor: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [{ y }, setY] = useSpring(() => ({ y: window.innerHeight }));

  useEffect(() => {
    setY({ y: isVisible ? 0 : window.innerHeight });
  }, [isVisible, setY]);

  const bind = useDrag(
    ({ down, movement: [, my], cancel }) => {
      if (my < 0) {
        cancel();
      }

      setY({
        y: down ? my : isVisible ? 0 : window.innerHeight,
        immediate: down,
        config: { tension: 300, friction: 30 },
      });

      if (!down) {
        if (my > 10) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    },
    {
      filterTaps: true,
    }
  );

  return (
    <animated.div
      style={{
        y,
        backgroundColor: backgrounColor,
        overflow: "hidden",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px 20px 0 0",
        borderColor: extractHexColor(theme.vars.palette.divider),
        borderWidth: "1px",
        borderBottomWidth: 0,
        touchAction: "none",
      }}
    >
      <animated.div {...bind()}>
        <Box
          sx={{
            width: "50px",
            height: "5px",
            backgroundColor: "divider",
            borderRadius: "5px",
            margin: "12px auto",
          }}
        ></Box>
      </animated.div>
      <div
        ref={contentRef}
        style={{
          paddingTop: "4px",
          height: "fit-content",
          overflowY: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </animated.div>
  );
}
