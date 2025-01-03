import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MileStoneAsset, RewardAsset } from "./Asset";
import { useInterval } from "@toss/react";
import { useColorTheme } from "@/hooks/useColorTheme";

export function MileStone({
  focused,
  onClick,
  clickable,
}: {
  focused?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}) {
  const [border, setBorder] = useState(false);
  useInterval(() => {
    if (focused) {
      setBorder((border) => !border);
    }
  }, 300);

  useEffect(() => {
    if (!focused) {
      setBorder(false);
    }
  }, [focused]);

  return (
    <div
      // className={`w-fit mx-auto`}
      css={{
        width: "fit-content",
        margin: "0 auto",
      }}
      onClick={() => {
        if (clickable && onClick) {
          onClick();
        }
      }}
    >
      <MileStoneAsset border={border} />
    </div>
  );
}

export type RewardState = "LOCKED" | "GAINED" | "NOGAINED";

export function Reward({
  focused,
  onClick,
  clickable,
  state,
}: {
  focused?: boolean;
  onClick?: () => void;
  clickable?: boolean;
  state: RewardState;
}) {
  const [border, setBorder] = useState(false);
  useInterval(() => {
    if (focused) {
      setBorder((border) => !border);
    }
  }, 300);

  useEffect(() => {
    if (!focused) {
      setBorder(false);
    }
  }, [focused]);

  return (
    <div
      css={{ width: "fit-content", margin: "0 auto" }}
      onClick={() => {
        if (clickable && onClick) {
          onClick();
        }
      }}
    >
      <RewardAsset border={border} state={state} />
    </div>
  );
}

export function Ground({
  rightRoundBorder,
  leftRoundBorder,
}: {
  rightRoundBorder?: boolean;
  leftRoundBorder?: boolean;
}) {
  const colorTheme = useColorTheme({ type: "anxy" });

  return (
    <div
      css={{
        width: "100%",
        height: "26px",
        backgroundColor: "#A67153",
        paddingBottom: "5px",
        position: "relative",
        overflow: "hidden",
        borderRadius: `${leftRoundBorder ? "3px" : 0} ${
          rightRoundBorder ? "3px" : 0
        } ${rightRoundBorder ? "3px" : 0} ${leftRoundBorder ? "3px" : 0}`,
      }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          paddingBottom: "5px",
          backgroundColor: colorTheme.green,
        }}
      >
        <div
          css={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#000000",
            opacity: "0.3",
          }}
        />
        <div
          css={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: colorTheme.green,
          }}
        />
      </div>
    </div>
  );
}
export function GroundWithFlag({
  focused,
  onClick,
  clickable,
}: {
  focused?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}) {
  return (
    <div
      css={{
        width: "100vw",
        position: "relative",
      }}
    >
      <div
        css={{
          width: "124px",
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <MileStone focused={focused} onClick={onClick} clickable={clickable} />
      </div>
      <Ground />
    </div>
  );
}
export function Bridge({ isFirstAppear }: { isFirstAppear?: boolean }) {
  const colorTheme = useColorTheme({ type: "anxy" });
  return (
    <motion.div
      initial={{ scale: isFirstAppear ? 0 : 1 }}
      animate={{ scale: 1 }}
      transition={{
        type: isFirstAppear ? "spring" : undefined,
        stiffness: 100,
      }}
      css={{
        width: "100%",
        height: "26px",
        borderRadius: "3px",
        backgroundColor: colorTheme.orange,
      }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "3px",
          paddingBottom: "10px",
          backgroundColor: "#000000",
          opacity: 0.3,
        }}
      >
        <div
          css={{
            width: "100%",
            height: "100%",
            borderRadius: "3px",
            position: "relative",
            backgroundColor: colorTheme.orange,
          }}
        />
      </div>
    </motion.div>
  );
}
