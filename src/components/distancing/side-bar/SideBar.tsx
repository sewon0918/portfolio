import { Box, Stack } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import HomeTaskList from "./HomeTaskList";
import { isInIframe } from "@/utils/isInIframe";
import { LogoWithTextSvg } from "../../../assets/distancing/SvgAssets";

export default function Sidebar({ isHome }: { isHome?: boolean }) {
  const isInappWebview = isInIframe;

  const backgroundColor = isInappWebview
    ? "background.level1"
    : "background.level2";

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: !isHome && isInappWebview ? "absolute" : "sticky",
        transform:
          !isHome && isInappWebview ? "translateX(-100%)" : "translateX(0)",
        width: "var(--Sidebar-width)",

        paddingBottom: `${20}px`,
        height: "100%",
        top: 0,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: backgroundColor,
        overflow: "hidden",
      }}
    >
      <Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            px: "24px",
            height: "var(--StickyHeader-height)",
            minHeight: "var(--StickyHeader-height)",
          }}
        >
          <LogoWithTextSvg />
        </Stack>
      </Stack>

      <Stack
        sx={{
          width: "100%",
          minHeight: 0,
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            pb: 10,
            minHeight: 0,
            height: "100%",
            overflow: "hidden auto",
            transition: "transform 0.4s, width 0.4s",
            backgroundColor: backgroundColor,

            zIndex: 10,
          }}
        >
          <HomeTaskList />
        </Box>
      </Stack>
    </Sheet>
  );
}
