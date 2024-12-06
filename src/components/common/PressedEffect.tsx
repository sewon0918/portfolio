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
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setButtonDown(true);
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setButtonDown(false);
      }}
      onClick={() => {
        if (!disable && action) {
          // e.preventDefault();
          // e.stopPropagation();
          action();
        }
      }}
      // onTouchStart={(e) => {
      //   setTouchStartY(e.changedTouches[0].clientY);
      //   setTouchStartX(e.changedTouches[0].clientX);

      //   if (!disable) {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     setButtonDown(true);
      //   }
      // }}
      // onTouchMove={(e) => {
      //   if (
      //     Math.abs(e.changedTouches[0].clientY - touchStartY) > 0 ||
      //     Math.abs(e.changedTouches[0].clientX - touchStartX) > 0
      //   ) {
      //     setButtonDown(false);
      //   }
      // }}
      // onTouchEnd={(e) => {
      //   setButtonDown(false);

      //   if (
      //     !(
      //       Math.abs(e.changedTouches[0].clientY - touchStartY) > 5 ||
      //       Math.abs(e.changedTouches[0].clientX - touchStartX) > 5
      //     )
      //   ) {
      //     if (!disable && action && !hasButton) {
      //       e.preventDefault();
      //       e.stopPropagation();
      //       action();
      //     }
      //   }
      // }}
    >
      {element}
    </motion.div>
  );
};
