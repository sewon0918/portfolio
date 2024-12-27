import { Stack, Typography } from "@mui/joy";
import TypographyWithHighlight from "../../common/TypographyWithHighlight";

export default function OutcomeOverview() {
  const data = [
    {
      percentage: 34,
      name: "우울감",
      score_before: 16.57,
      score_after: 10.86,
    },
    {
      percentage: 40,
      name: "불안감",
      score_before: 14.86,
      score_after: 8.91,
    },
    {
      percentage: 23,
      name: "우울감",
      score_before: 27.44,
      score_after: 21.14,
    },
  ];
  return (
    <Stack direction="column">
      {data.map(({ percentage, name, score_before, score_after }, index) => (
        <Stack
          key={`outcome${index}`}
          sx={{
            flex: 1,
            py: "20px",
          }}
          spacing="12px"
        >
          <Typography
            level="h1"
            sx={{ flexShrink: 0, fontSize: "60px" }}
            color="primary"
          >
            {percentage}
            <Typography level="h4" color="primary">
              {` %`}
            </Typography>
          </Typography>
          <TypographyWithHighlight
            text={`디스턴싱 이용 7주 후에 ${name} 점수가 평균 ${score_before}점에서 ${score_after}점으로 낮아졌어요.`}
            highlightedText={name}
            type="neutral"
          />
        </Stack>
      ))}
    </Stack>
  );
}
