import { memo } from "react";
import Typography from "@mui/joy/Typography";
import { Stack } from "@mui/joy";
import useOpenTask from "@/hooks/distancing/useOpenTask";
import { extractHexColor } from "@/utils/helpers";
import { theme } from "@/styles/theme";

const CheckIcon = () => {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.5L4 6.5L9.5 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export function Status({
  isDone,
  isOpen,
}: {
  isDone: boolean;
  isOpen: boolean;
}) {
  return (
    <Stack
      sx={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        ...(!isDone
          ? {
              borderWidth: "1.6px",
              borderColor: isOpen ? "primary.solid" : "#B6B9BC",
            }
          : {
              backgroundColor: "#B6B9BC",
            }),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isDone && <CheckIcon />}
    </Stack>
  );
}

export function LockIcon() {
  const color = extractHexColor(theme.vars.palette.primary.solid);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 8V6C14 3.79086 12.2091 2 10 2V2C7.79086 2 6 3.79086 6 6V8"
        stroke={color}
        stroke-width="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8C2.89543 8 2 8.89543 2 10V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V10C18 8.89543 17.1046 8 16 8H4ZM12 12C12 12.9319 11.3626 13.715 10.5 13.937V15.5C10.5 15.7761 10.2761 16 10 16C9.72386 16 9.5 15.7761 9.5 15.5V13.937C8.63739 13.715 8 12.9319 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z"
        fill={color}
      />
    </svg>
  );
}

function TaskItem({
  taskKey,
  isDone,
  isLocked,
}: {
  taskKey: string;
  isDone: boolean;
  isLocked?: boolean;
}) {
  const openTask = useOpenTask(`${taskKey}`);
  const openPayment = useOpenTask("payment");

  const title = "mock title";
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{
        position: "relative",
        cursor: "pointer",
        px: "12px",
        py: "8px",
        borderRadius: "12px",
        "&:hover": {
          backgroundColor: "background.level1",
        },
      }}
      onClick={() => {
        (document.activeElement as HTMLElement)?.blur();
        if (isLocked) {
          openPayment();
        } else {
          openTask();
        }
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={"8px"}
        sx={{ flex: 1 }}
      >
        {!isLocked ? <Status isOpen={true} isDone={isDone} /> : <LockIcon />}

        <Typography level="body-md" sx={{ flex: 1 }} fontWeight={500}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default memo(TaskItem);
