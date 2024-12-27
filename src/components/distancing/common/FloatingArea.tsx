import { theme } from "@/styles/theme";
import { extractHexColor } from "@/utils/helpers";
import { isInIframe } from "@/utils/isInIframe";
import { Box, Stack } from "@mui/joy";
import { forwardRef } from "react";

interface FloatingAreaProps {
  children: React.ReactNode;
}
const FloatingArea = forwardRef<HTMLDivElement, FloatingAreaProps>(
  ({ children }, ref) => {
    const isInappWebview = isInIframe;
    const backgroundColor = extractHexColor(
      theme.vars.palette.background.level1
    );

    return (
      <Box
        ref={ref}
        sx={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          ...{
            left: isInappWebview ? 0 : "var(--Sidebar-width)",
            width: isInappWebview
              ? "100%"
              : `calc(100% - var(--Sidebar-width, 0))`,
          },
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            zIndex: 10,
            left: 0,
            width: "100%",
            height: "50px",
            background: `linear-gradient(180deg, ${backgroundColor}00 0%, ${backgroundColor} 100%)`,
          }}
        />
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: `0px -1px 0px rgba(0, 0, 0, 0.1)`,
            px: "20px",
            pt: "20px",
            pb: `${20}px`,
            pointerEvents: "auto",
          }}
        >
          <Stack
            className={` w-full ${"max-w-[720px] mx-auto"}`}
            alignItems="center"
          >
            {children}
          </Stack>
        </Box>
      </Box>
    );
  }
);

export default FloatingArea;
