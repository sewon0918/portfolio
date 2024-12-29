import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface PressedEffectProps {
  element: React.ReactNode;
  className?: string;
  disable?: boolean;
  action?: () => void;
  hasButton?: boolean;
}

export const PressedEffect: React.FC<PressedEffectProps> = (
  props: PressedEffectProps
) => {
  const { element, className, disable = false, action } = props;
  const [buttonDown, setButtonDown] = useState(false);

  const pressedRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      animate={{ scale: buttonDown && !disable ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full h-full  ${className} `}
      ref={pressedRef}
      onMouseDown={() => {
        setButtonDown(true);
      }}
      onTouchStart={() => {
        setButtonDown(true);
      }}
      onMouseUp={() => {
        setButtonDown(false);
      }}
      onTouchEnd={() => {
        setButtonDown(false);
      }}
      onClick={() => {
        if (!disable && action) {
          action();
        }
      }}
    >
      {element}
    </motion.div>
  );
};
