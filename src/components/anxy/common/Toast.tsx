import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLayout } from "@/hooks/useLayout";

export default function Toast({
  text,
  showToast,
  setShowToast,
}: {
  text: string;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { notchHeight } = useLayout();

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  return (
    <motion.div
      style={{
        top: notchHeight,
        left: 0,
        width: "100%",
        position: "fixed",
        paddingLeft: "20px",
        paddingRight: "20px",
        zIndex: 100,
        pointerEvents: "none",
        opacity: 0,
      }}
      animate={{ y: showToast ? `0px` : "-10px", opacity: showToast ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "12px",
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "15px",
          paddingRight: "15px",
          fontSize: "15px",
          lineHeight: "18px",
          textAlign: "center",
          color: "white",
          background: "rgba(38,40,44,0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}
