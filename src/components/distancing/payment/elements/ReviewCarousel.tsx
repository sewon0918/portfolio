import { Box, Stack, SvgIcon, Typography } from "@mui/joy";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { addAlpha, extractHexColor } from "@/utils/helpers";
import { theme } from "@/styles/theme";

export default function ReviewCarousel() {
  const data: {
    text: string;
    from: string;
  }[] = [
    {
      text: "생각을 바라보는 완전히 새로운 접근",
      from: "설*",
    },
    {
      text: "신선하고, 사려 깊고, 과학적인 프로그램",
      from: "H*",
    },
    {
      text: "생각의 부정적 흐름을 잡아주는 나침반",
      from: "니가*",
    },
    {
      text: "생각을 객관적으로 바라보는 연습을 할 수 있어요",
      from: "나들너*",
    },
    {
      text: "지금까지 받았던 인지 치료 중에 최고였어요",
      from: "델*",
    },
    {
      text: "밀려드는 생각으로 힘드신 분들께 적극 추천해요",
      from: "키키르페*",
    },
    {
      text: "코치님의 존재만으로도 심리적 지지가 돼요",
      from: "박지*",
    },
  ];

  const CustomRightArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div onClick={onClick}>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width="20" height="20" rx="3" fill="none" />
          <path
            d="M8 16L12 11L8 6"
            stroke="#20242B"
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  const CustomDot = (props: any) => {
    const { onClick, active } = props;

    return (
      <Box
        sx={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: active
            ? "common.black"
            : addAlpha(extractHexColor(theme.vars.palette.common.black), 0.1),
          mx: "4px",
          mt: "10px",
        }}
        onClick={onClick}
      ></Box>
    );
  };

  const backgroundColor = "#ffffff";

  return (
    <Stack sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          zIndex: 10,
          left: 0,
          width: "20px",
          height: "100%",
          background: `linear-gradient(-90deg, ${backgroundColor}00 0%, ${backgroundColor} 100%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 10,
          right: 0,
          width: "20px",
          height: "100%",
          background: `linear-gradient(90deg, ${backgroundColor}00 0%, ${backgroundColor} 100%)`,
        }}
      />
      <Carousel
        customRightArrow={<CustomRightArrow />}
        customDot={<CustomDot />}
        arrows={false}
        renderDotsOutside={true}
        centerMode={false}
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
          },
        }}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="px-[4px] flex-1 content-center"
      >
        {data.map(({ text, from }, i) => (
          <Stack
            key={`review${i}`}
            sx={{
              width: "100%",
              pb: "40px",
              height: "100%",
            }}
          >
            <Stack
              key={text}
              direction={"column"}
              spacing="12px"
              alignItems={"center"}
              sx={{
                width: "100%",
                borderRadius: "12px",
                px: "20px",
                height: "100%",
              }}
            >
              <Stack direction="row" spacing="0px">
                {Array.from({ length: 5 }, (v, i) => i + 1).map((_, j) => (
                  <SvgIcon
                    key={`review${i}_star${j}`}
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <StarRoundedIcon />
                  </SvgIcon>
                ))}
              </Stack>

              <Typography level="h4" fontWeight={700} textAlign="center">
                {text}
              </Typography>
              <Typography level="body-xs" sx={{ opacity: 0.5 }}>
                {from}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
}
