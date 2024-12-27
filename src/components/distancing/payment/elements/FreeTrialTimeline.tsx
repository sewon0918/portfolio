import { Box, Stack, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { addAlpha, extractHexColor, getImageUrl } from "@/utils/helpers";
import { theme } from "@/styles/theme";
import TypographyWithHighlight from "../../common/TypographyWithHighlight";

export default function FreeTrialTimeline() {
  const today = dayjs();
  return (
    <Stack spacing={"12px"} sx={{ pl: "20px" }}>
      <Box sx={{ position: "relative", pb: "25px" }}>
        <Stack
          sx={{
            position: "absolute",
            top: "5px",
            left: "11px",
            width: "3px",
            height: "calc(100% - 5px)",
            background: `linear-gradient(180deg, ${extractHexColor(
              theme.vars.palette.primary.solid
            )} 75%, ${addAlpha(
              extractHexColor(theme.vars.palette.primary.solid),
              0
            )} 100%)`,
            transform: "translateX(-50%)",
          }}
        ></Stack>
        <img
          style={{
            position: "absolute",
            right: "-20px",
            bottom: 0,
            width: "93px",
          }}
          alt={"empty"}
          src={getImageUrl(
            `../../../../assets/distancing/payment/freetrial_timeline_image.png`,
            import.meta.url
          )}
        />
        <Stack spacing={"30px"}>
          {[
            {
              title: `오늘 (${today.format("M/D")})`,
              text: "나의 고민 분석, 맞춤 프로그램 구성",
            },
            {
              title: `5일 차 (${today.add(5, "day").format("M/D")})`,
              text: `체험 종료 예정 안내`,
            },
            {
              title: `7일 차 (${today.add(7, "day").format("M/D")})`,
              text: "체험 취소 시 100% 무료",
              boldText: "100% 무료",
            },
          ].map(({ title, text, boldText }, index) => (
            <Stack direction={"row"} spacing="15px">
              <Stack
                sx={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  p: "5px",
                  backgroundColor: addAlpha(
                    extractHexColor(theme.vars.palette.primary.solid),
                    index === 0 ? 0.1 : 0
                  ),
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: "primary.solid",
                  }}
                ></Stack>
              </Stack>
              <Stack key={title} spacing={"4px"}>
                <Typography level="body-md" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
                <TypographyWithHighlight
                  text={text}
                  highlightedText={boldText || ""}
                  type="neutral"
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
