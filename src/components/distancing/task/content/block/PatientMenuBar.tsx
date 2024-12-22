import { theme } from "@/styles/theme";
import { extractHexColor } from "@/utils/helpers";
import { IconButton, Stack, SvgIcon } from "@mui/joy";
import { motion } from "framer-motion";
import { memo } from "react";
import { NextArrowSvg } from "../../../../../assets/distancing/SvgAssets";

function PatientMenuBar({
  highlight,
  disabled,
  onClick,
}: {
  highlight?: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const activatedColor = extractHexColor(theme.vars.palette.primary.solid);
  const deactivatedColor = extractHexColor(
    theme.vars.palette.primary.deactivated
  );
  return (
    <Stack direction={"row"} justifyContent="end" onClick={onClick}>
      <motion.div
        style={{
          cursor: "pointer",
          paddingTop: "4px",
        }}
        animate={{
          opacity: highlight && !disabled ? [1, 0, 1] : 1,
        }}
        transition={{
          delay: 1,
          duration: highlight && !disabled ? 1 : 0,
          repeat: highlight && !disabled ? Infinity : 0,
        }}
      >
        <IconButton disabled={disabled}>
          <SvgIcon sx={{ width: "14px", height: "14px" }} inheritViewBox>
            <NextArrowSvg
              color={!disabled ? activatedColor : deactivatedColor}
            />
          </SvgIcon>
        </IconButton>
      </motion.div>
    </Stack>
  );
}

export default memo(PatientMenuBar);
