import { Stack } from "@mui/joy";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import { addAlpha, getImageUrl } from "@/utils/helpers";

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
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isHorizontalScroll = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalScroll.current = false; // 초기화
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const deltaX = Math.abs(currentX - startX.current);
    const deltaY = Math.abs(currentY - startY.current);

    // 가로 스크롤이 감지되면 세로 이동을 억제
    if (deltaX > deltaY && deltaX > 10) {
      isHorizontalScroll.current = true;
    } else if (deltaY > deltaX) {
      // 세로 스크롤 감지 시 무시하여 가로 스크롤만 동작하게 함
      isHorizontalScroll.current = false;
    }

    // 세로 스크롤이 아니라면 스크롤 동작을 차단
    if (!isHorizontalScroll.current) {
      e.stopPropagation(); // 세로 스크롤 막기
    }
  };
  return (
    <Stack
      sx={{
        width: "100%",
        paddingBottom: "20px",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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
