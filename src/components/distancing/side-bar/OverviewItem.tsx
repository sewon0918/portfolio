import Typography from "@mui/joy/Typography";
import { Box, Stack } from "@mui/joy";
import useOpenTask from "@/hooks/distancing/useOpenTask";
import { isInIframe } from "@/utils/isInIframe";

const ThoughtmapIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 13.5V11C16 9.89543 15.1046 9 14 9H6C4.89543 9 4 9.89543 4 11V13.5"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 4V16"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ValueCompassIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4H16V7"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16L4 16L4 13"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="10"
        r="3"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProgressIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5L6.73331 7.66323C7.10678 8.02712 7.6076 8.23077 8.12904 8.23077H11.3183C11.8398 8.23077 12.3406 8.43442 12.7141 8.79831L16 12"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 16.5H17"
        stroke="#20242B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function OverviewItem({ taskKey }: { taskKey: string }) {
  const openTask = useOpenTask(`${taskKey}`);
  const title = "title";
  const isInappWebview = isInIframe;

  return (
    <Stack
      direction={isInappWebview ? "column" : "row"}
      alignItems={isInappWebview ? "start" : "center"}
      spacing="10px"
      sx={{
        cursor: "pointer",
        px: "20px",
        py: "16px",
        borderRadius: "12px",
        ...(isInappWebview
          ? {
              backgroundColor: "white",
              borderWidth: "1px",
              borderColor: "divider",
              "&:hover": {
                backgroundColor: "background.level1",
              },
            }
          : {
              "&:hover": {
                backgroundColor: "background.level2",
              },
            }),
      }}
      onClick={() => {
        (document.activeElement as HTMLElement)?.blur();
        openTask();
      }}
    >
      <Box
        sx={{
          width: "20px",
          height: "20px",
          mr: "6px",
        }}
      >
        {taskKey === "thoughtmap" ? (
          <ThoughtmapIcon />
        ) : taskKey === "valueCompass" ? (
          <ValueCompassIcon />
        ) : taskKey === "progress" ? (
          <ProgressIcon />
        ) : (
          <></>
        )}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: "16px",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
        fontWeight={600}
      >
        {title}
      </Typography>
    </Stack>
  );
}
