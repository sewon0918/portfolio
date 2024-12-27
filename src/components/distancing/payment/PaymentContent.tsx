import { Box, Stack, Typography } from "@mui/joy";
import {
  PaymentButton,
  FeatureCarousel,
  QnA,
  ReviewCarousel,
  FreeTrialTimeline,
  CompareWithCounseling,
  ShowAllSubscriptionPlanButton,
  SubscriptionPlan,
  SelectedPlan,
  OutcomeOverview,
} from "./elements";
import React, { useEffect, useRef, useState } from "react";
import { SxProps } from "@mui/joy/styles/types";
import payment_thumbnail from "@/assets/distancing/payment/payment_thumbnail.png";
import FloatingArea from "../common/FloatingArea";
import TypographyWithHighlight from "../common/TypographyWithHighlight";
import ContentTemplate from "../task/content/ContentTemplate";

export default function PaymentContent() {
  const title = "3개월 뒤 불만족 시 \n 100% 환불해드려요";
  const subtitle = "* 매주 3회 이상 참여 시";

  const floatingAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(floatingAreaRef.current?.offsetHeight);
  }, [floatingAreaRef]);

  const Title = ({ title }: { title: string }) => {
    return (
      <Typography
        level={"h2"}
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
    );
  };

  const Container = ({
    children,
    title,
    customSx,
    backgroundColor,
  }: {
    children: React.ReactNode;
    title: string;
    customSx?: SxProps;
    backgroundColor?: string;
  }) => {
    return (
      <Stack
        sx={{
          width: "100%",

          pt: "50px",
          pb: "50px",
          backgroundColor: backgroundColor,
        }}
      >
        <Stack
          spacing={"30px"}
          sx={{ width: "100%", maxWidth: "720px", mx: "auto" }}
        >
          <Stack sx={{ px: "40px" }}>
            <Title title={title} />
          </Stack>
          <Stack sx={{ width: "100%", px: "40px", ...customSx }}>
            {children}
          </Stack>
        </Stack>
      </Stack>
    );
  };
  const homeIndicatorHeight = 20;
  const [containerHeight, setContainerHeight] = useState<number>(
    window.innerHeight - homeIndicatorHeight
  );
  const [floatingAreaHeight, setFloatingAreaHeight] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setFloatingAreaHeight(floatingAreaRef.current?.offsetHeight || 0);
    }, 100);
  }, [floatingAreaRef.current]);

  return (
    <ContentTemplate setContainerHeight={setContainerHeight}>
      {containerHeight > 0 && (
        <Stack sx={{ pb: "150px", opacity: floatingAreaHeight > 0 ? 1 : 0 }}>
          <Stack
            sx={{
              width: "100%",
              backgroundColor: "secondary.solid",
              px: "20px",
              pt: "50px",
              pb: "60px",
            }}
          >
            <Stack
              spacing={"52px"}
              sx={{ width: "100%", maxWidth: "720px", mx: "auto" }}
              alignItems="center"
            >
              <Stack
                spacing={"52px"}
                justifyContent="center"
                sx={{
                  height: `calc(${containerHeight}px - ${floatingAreaHeight}px)`,
                }}
              >
                <img
                  src={payment_thumbnail}
                  alt={"empty"}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                  }}
                />
                <Stack spacing={"12px"} sx={{ textAlign: "center" }}>
                  <Typography
                    level={"h1"}
                    sx={{
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                      color: "white",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    level={"body-md"}
                    sx={{ color: "white", opacity: 0.5 }}
                  >
                    {subtitle}
                  </Typography>
                </Stack>
              </Stack>
              <SubscriptionPlan />
            </Stack>
          </Stack>
          <Container title={"보장된 효과"} backgroundColor="white">
            <Stack spacing="30px">
              {/* <Supporters /> */}
              <OutcomeOverview />
              <Box sx={{ pt: "50px" }}>
                <ReviewCarousel />
              </Box>
            </Stack>
          </Container>
          <Container title={"매일, 코치와, 꾸준히"} customSx={{ px: "0px" }}>
            <FeatureCarousel />
          </Container>
          <Container title={"3배 더 많이, 5배 더 싸게"}>
            <Stack spacing="30px">
              {[
                {
                  title: "분량",
                  text: "디스턴싱에서는 매일 30분 정도의 활동이 제공돼요. 한 달로 치면 약 600분에 달하는 시간이죠. 일반 심리상담의 3배 분량이랍니다.",
                  highlightedText: "일반 심리상담의 3배",
                },
                {
                  title: "비용",
                  text: "디스턴싱은 월 8만원에 이용할 수 있어요. 반면, 일반 심리상담은 한 달에 40만 원 정도의 비용이 발생하죠.",
                  highlightedText: "월 8만원",
                },
              ].map(({ title, text, highlightedText }) => (
                <Stack
                  spacing="24px"
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  <Stack spacing="12px">
                    <Typography level="body-md" fontWeight={700}>
                      {title}
                    </Typography>
                    <Stack spacing="20px">
                      <TypographyWithHighlight
                        text={text}
                        highlightedText={highlightedText}
                        type="neutral"
                      />
                      <CompareWithCounseling
                        type={title === "분량" ? "quantity" : "cost"}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Container>

          <Container
            title={"7일 무료 체험부터\n시작하세요"}
            customSx={{ px: "20px" }}
          >
            <FreeTrialTimeline />
          </Container>

          <Container title={"자주 묻는 질문"}>
            <QnA />
          </Container>
          <Box>
            <FloatingArea ref={floatingAreaRef}>
              <Stack spacing="8px" sx={{ width: "100%" }} alignItems="center">
                <SelectedPlan />
                <Stack
                  spacing="12px"
                  sx={{ width: "100%" }}
                  alignItems="center"
                >
                  <PaymentButton />
                  <ShowAllSubscriptionPlanButton />
                </Stack>
              </Stack>
            </FloatingArea>
          </Box>
        </Stack>
      )}
    </ContentTemplate>
  );
}
