import { isMobileVersion } from "@/utils/isMobileVersion";
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
  const [hasClicked, setHasClicked] = useState(false);
  return (
    <div
      css={{
        maxWidth: "100%",
        display: "flex",
        flexWrap: "wrap",
        fontSize: "40px",
        fontWeight: 700,
        backgroundColor: "transparent",
        fontFamily: "Arial, sans-serif",
        pointerEvents: onClick ? "auto" : "none",
        transformOrigin: "left",
        ...(!isMobileVersion && {
          transition: "all 0.2s ease",
        }),

        ...(isHover
          ? {
              cursor: "pointer",
              backgroundColor: "transparent",
              textDecoration: "underline",
              color: "orange",
              fontSize: "50px",
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
        setTimeout(() => {
          if (!hasClicked) {
            setIsHover(false);
          }
        }, 100);
      }}
      onClick={() => {
        if (onClick) {
          setHasClicked(true);
          setIsHover(true);
          onClick();
        }
      }}
    >
      <div css={{ whiteSpace: "nowrap" }}> {title}</div>

      {isHover && (
        <div>
          <ArrowForwardRoundedIcon
            css={{
              fontSize: "30px",
              color: "inherit",
              marginLeft: "4px",
              opacity: isHover ? 1 : 0,
              display: "inline",
            }}
          />
        </div>
      )}
    </div>
  );
}
