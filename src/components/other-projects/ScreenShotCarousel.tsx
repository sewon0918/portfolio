import { Stack } from "@mui/joy";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import { addAlpha, getImageUrl } from "@/utils/helpers";
import usePreventScrollWhenHorizontalSwipe from "@/hooks/usePreventScrollWhenHorizontalSwipe";
import VideoScreenShot from "../common/VideoScreenshot";

const CustomDot = (props: any) => {
  const { onClick, active } = props;

  return (
    <div
      css={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: active ? "#000000" : addAlpha("#000000", 0.1),
        mx: "4px",
        mt: "10px",
        margin: "20px 4px 0 4px",
      }}
      onClick={onClick}
    ></div>
  );
};

export default function ScreenShotCarousel({
  srcList,
  responsive,
}: {
  srcList: string[];
  responsive?: { desktop: number; mobile: number };
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  usePreventScrollWhenHorizontalSwipe({ carouselRef });

  return (
    <Stack
      sx={{
        width: "100%",
        paddingBottom: "20px",
        position: "relative",
      }}
      ref={carouselRef}
    >
      {/* <VideoScreenShot
        src={getImageUrl(
          "../../assets/wallflower_society/demo.mp4",
          import.meta.url
        )}
      /> */}
      <Carousel
        showDots
        customDot={<CustomDot />}
        arrows={false}
        renderDotsOutside={true}
        centerMode={false}
        swipeable={true}
        draggable={true}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: responsive?.desktop || 3,
            slidesToSlide: 1, // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: responsive?.mobile || 3,
            slidesToSlide: 1, // optional, default to 1.
          },
        }}
        ssr={true}
        keyBoardControl={true}
        customTransition="all .5s"
      >
        {srcList.map((src) => (
          <div
            key={src}
            css={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              padding: "0 4px",
            }}
          >
            {src.includes("webp") || src.includes("png") ? (
              <img
                src={getImageUrl(src, import.meta.url)}
                css={{ width: "100%", pointerEvents: "none" }}
                loading="lazy"
              />
            ) : src.includes("mp4") ? (
              <div
                css={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <VideoScreenShot src={getImageUrl(src, import.meta.url)} />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </Carousel>
    </Stack>
  );
}
