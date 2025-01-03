import { useEffect, useRef, useState } from "react";
import iphone13 from "@/assets/common/iphone13.webp";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

export default function VideoScreenShot({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setContainerWidth(containerRef.current?.offsetWidth || 0);
  }, [containerRef.current]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div
      css={{
        width: "100%",
        height: `${containerWidth * (840 / 420)}px`,
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <div
        css={{
          width: "420px",
          height: "840px",
          position: "relative",
          borderRadius: "70px",
          overflow: "hidden",
          padding: "18px 6px 0px 10px",
          scale: containerWidth / 420,
          transformOrigin: "top left",
        }}
      >
        <div
          css={{
            position: "absolute",
            zIndex: 100,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <img src={iphone13} css={{ width: "100%", height: "100%" }} />
        </div>
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            opacity: !isPlaying ? 1 : 0,
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <div
            css={{
              position: "absolute",
              zIndex: 100,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              backgroundColor: "#ffffff",
              fontSize: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setIsPlaying((isPlaying) => !isPlaying);
            }}
          >
            {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </div>
        </div>

        <video
          ref={videoRef}
          width="100%"
          height="100%"
          // controls
          css={{
            objectFit: "cover",
            borderRadius: "50px",
          }}
          // playsInline
          onEnded={() => {
            setIsPlaying(false);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
