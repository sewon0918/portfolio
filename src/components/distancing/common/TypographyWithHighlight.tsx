import { theme } from "@/styles/theme";
import { addAlpha, extractHexColor } from "@/utils/helpers";
import { Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export function findSubstringIndices(mainString: string, subString: string) {
  const startIndex = mainString.indexOf(subString);

  if (startIndex !== -1) {
    const endIndex = startIndex + subString.length - 1;
    return { startIndex, endIndex };
  } else {
    // 부분 문자열이 포함되어 있지 않은 경우
    return { startIndex: -1, endIndex: -1 };
  }
}

export default function TypographyWithHighlight({
  text,
  highlightedText,
  customSx,
  highlightedCustomSx,
  type,
}: {
  text: string;
  highlightedText: string;
  customSx?: SxProps;
  highlightedCustomSx?: SxProps;
  type?: "neutral";
}) {
  return (
    <Stack direction="row" alignItems={"center"} spacing="12px">
      <Typography
        level="body-md"
        fontWeight="600"
        sx={{
          color:
            type === "neutral"
              ? addAlpha(extractHexColor(theme.vars.palette.common.black), 0.5)
              : "common.black",
          ...customSx,
        }}
      >
        <div>
          {[
            text.substring(
              0,
              findSubstringIndices(text, highlightedText).startIndex
            ),
            highlightedText,
            text.substring(
              findSubstringIndices(text, highlightedText).endIndex + 1
            ),
          ].map((each) =>
            each === highlightedText ? (
              <Typography
                level="body-md"
                color="primary"
                sx={{
                  color: type === "neutral" ? "common.black" : "primary.solid",
                  ...(highlightedCustomSx || {}),
                }}
              >
                {each}
              </Typography>
            ) : (
              <span key={each}>{each}</span>
            )
          )}
        </div>
      </Typography>
    </Stack>
  );
}
