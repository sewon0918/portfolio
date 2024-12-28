import { Box } from "@mui/joy";

import { useEffect, useState } from "react";
import { ProgramContentType } from "../../../../data/distancing/BlockComponent";
import { getLastShownIndex } from "../../logic/logics";

export default function TaskProgressBar({
  data,
}: {
  data?: ProgramContentType[];
}) {
  const [progress, setProgress] = useState<number>(0);

  function getPercentage(index: number) {
    if (data) {
      return (index / data.length) * 100;
    }
    return 0;
  }

  useEffect(() => {
    const lastIndex = getLastShownIndex(data);
    setProgress(getPercentage(lastIndex + 1));
  }, [data]);

  const [whileHovering, setWhileHovering] = useState<boolean>(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "3px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: whileHovering ? "16px" : "4px",
          backgroundColor: "secondary.soft",
        }}
        onMouseEnter={() => {
          setWhileHovering(true);
        }}
        onMouseLeave={() => {
          setWhileHovering(false);
        }}
        onTouchStart={() => {
          setWhileHovering(true);
        }}
        onTouchEnd={() => {
          setWhileHovering(false);
        }}
        onTouchCancel={() => {
          setWhileHovering(false);
        }}
        className="transition-all"
      >
        {progress > 0 && (
          <Box
            sx={{
              position: "absolute",
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "secondary.deactivated",
              borderRadius: "4px",
            }}
            className="transition-all duration-500"
          ></Box>
        )}
      </Box>
    </Box>
  );
}
