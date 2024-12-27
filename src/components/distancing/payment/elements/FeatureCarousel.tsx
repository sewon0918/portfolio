import { Stack, Typography } from "@mui/joy";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import keypoint_screenshot1 from "@/assets/distancing/payment/keypoint_screenshot1.png";
import keypoint_screenshot2 from "@/assets/distancing/payment/keypoint_screenshot2.png";
import keypoint_screenshot3 from "@/assets/distancing/payment/keypoint_screenshot3.png";

export default function FeatureCarousel() {
  const data: {
    label: string;
    title: string;
    subtitle: string;
    image: string;
  }[] = [
    {
      label: "매일",
      title: "매일 주어지는 나만의 활동",
      subtitle:
        "질문에 따라 생각을 적어나가며\n마음이 작동하는 원리를 이해해요.",
      image: keypoint_screenshot1,
    },
    {
      label: "코치와",
      title: "처음부터 끝까지 코치와 함께",
      subtitle: "모든 활동은 1:1 코치가 함께해요.\n예약은 필요 없답니다.",
      image: keypoint_screenshot2,
    },
    {
      label: "꾸준히",
      title: "꾸준히 체크하는 목표",
      subtitle: "코치와 함께 목표를 설정하고\n주기적으로 진행 상황을 체크해요.",
      image: keypoint_screenshot3,
    },
  ];
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
        overflow: "hidden",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Carousel
        arrows={false}
        swipeable={true}
        draggable={true}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 40, //
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 40, //
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 40, //
          },
        }}
        // ssr={true} // means to render carousel on server-side.
        keyBoardControl={true}
        customTransition="all .5s"
        partialVisible={true}
      >
        {data.map(({ label, title, subtitle, image }, index) => (
          <Stack
            sx={{
              ...(index === 0 && { pl: "20px", pr: "7px" }),
              ...(index === 1 && { px: "13px" }),
              ...(index === 2 && { pl: "7px", pr: "20px" }),
              pointerEvents: "none",
            }}
          >
            <Stack
              key={label}
              direction={"column"}
              spacing="16px"
              sx={{
                width: "100%",
                borderRadius: "12px",
                height: "100%",
                backgroundColor: "white",
                pb: "20px",
                overflow: "hidden",
                borderWidth: "1px",
                borderColor: "divider",
              }}
              alignItems="center"
            >
              <Stack
                justifyContent={"start"}
                alignItems={"center"}
                sx={{
                  pt: "20px",
                  width: "100%",
                  backgroundColor: "secondary.soft",
                  height: "300px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    objectFit: "cover",
                    objectPosition: "50% 0%",
                  }}
                />
              </Stack>
              <Stack spacing="4px" alignItems="center" sx={{ p: "20px" }}>
                <Typography level="body-lg" fontWeight="700">
                  {title}
                </Typography>
                <Typography
                  level="body-md"
                  sx={{ textAlign: "center", opacity: 0.5, fontWeight: 600 }}
                >
                  {subtitle}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
}
