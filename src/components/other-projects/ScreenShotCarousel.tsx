import { Stack } from "@mui/joy";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import { addAlpha, getImageUrl } from "@/utils/helpers";
import usePreventScrollWhenHorizontalSwipe from "@/hooks/usePreventScrollWhenHorizontalSwipe";

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

export default function ScreenShotCarousel({ srcList }: { srcList: string[] }) {
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
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
          },
        }}
        ssr={true}
        keyBoardControl={true}
        customTransition="all .5s"
      >
        {srcList.map((src) => (
          <div
            css={{
              width: "10",
              margin: "0 auto",
              padding: "0 4px",
            }}
          >
            <img
              src={getImageUrl(src, import.meta.url)}
              css={{ width: "100%", pointerEvents: "none" }}
            />
          </div>
        ))}
      </Carousel>
    </Stack>
  );
}
