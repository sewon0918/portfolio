import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface PressedEffectProps {
  element: React.ReactNode;
  disable?: boolean;
  action?: () => void;
  hasButton?: boolean;
}

export const PressedEffect: React.FC<PressedEffectProps> = (
  props: PressedEffectProps
) => {
  const { element, disable = false, action } = props;
  const [buttonDown, setButtonDown] = useState(false);

  const pressedRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      animate={{ scale: buttonDown && !disable ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
      css={{ ...(disable && { pointerEvents: "none" }) }}
      ref={pressedRef}
      onMouseDown={() => {
        setButtonDown(true);
      }}
      onTouchStart={() => {
        console.log("touch start");
        setButtonDown(true);
      }}
      onMouseUp={() => {
        setButtonDown(false);
      }}
      onTouchEnd={() => {
        setButtonDown(false);
      }}
      onClick={() => {
        if (action) {
          action();
        }
      }}
    >
      {element}
    </motion.div>
  );
};
