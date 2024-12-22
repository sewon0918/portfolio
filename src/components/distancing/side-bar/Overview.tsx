import { Stack } from "@mui/joy";
import OverviewItem from "./OverviewItem";
import { isInIframe } from "@/utils/isInIframe";

export default function Overview() {
  const isInappWebview = isInIframe;
  return (
    <Stack
      direction={isInappWebview ? "row" : "column"}
      justifyContent="center"
      spacing="8px"
      sx={{
        width: "100%",
      }}
    >
      {["progress", "thoughtmap", "valueCompass"].map((each) => (
        <Stack key={each} sx={{ flex: 1 }}>
          <OverviewItem taskKey={each} />
        </Stack>
      ))}
    </Stack>
  );
}
