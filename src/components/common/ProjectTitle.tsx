import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";

export default function ProjectTitle({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      css={{
        maxWidth: "100%",
        width: "fit-content",
        fontSize: "40px",
        fontWeight: 700,
        backgroundColor: "transparent",
        borderWidth: "0px",
        fontFamily: "Arial, sans-serif",
        // fontFamily: "Noto Sans, serif",
        pointerEvents: onClick ? "auto" : "none",
        transformOrigin: "left",
        transition: "all 0.2s ease",

        ...(isHover
          ? {
              cursor: "pointer",
              backgroundColor: "transparent",
              textDecoration: "underline",
              color: "orange",
              padding: "5px 0",
              scale: 1.2,
            }
          : {}),
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onTouchStart={() => {
        setIsHover(true);
      }}
      onTouchEnd={() => {
        setIsHover(false);
      }}
      onClick={onClick}
    >
      {title}
      {isHover && (
        <ArrowForwardRoundedIcon
          css={{
            fontSize: "30px",
            color: "inherit",
            marginLeft: "4px",
            opacity: isHover ? 1 : 0,
            display: "inline",
            // border: "1px solid red",
          }}
        />
      )}
    </div>
  );
}
