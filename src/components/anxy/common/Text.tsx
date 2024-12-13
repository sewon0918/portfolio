import { Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const StyledText15 = styled.div`
  font-size: 15px;
  line-height: 21px;
`;

const StyledText17 = styled.div`
  font-size: 17px;
  line-height: 24px;
`;
const StyledText18 = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
`;
const StyledText24 = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
`;

export function Text15({
  children,
  customCss,
}: {
  children: string;
  customCss?: Interpolation<Theme>;
}) {
  return <StyledText15 css={customCss}>{children}</StyledText15>;
}

export function Text17({
  children,
  customCss,
}: {
  children: string;
  customCss?: Interpolation<Theme>;
}) {
  return <StyledText17 css={customCss}>{children}</StyledText17>;
}
export function Text18({
  children,
  customCss,
}: {
  children: string;
  customCss?: Interpolation<Theme>;
}) {
  return <StyledText18 css={customCss}>{children}</StyledText18>;
}

export function Text24({
  children,
  customCss,
}: {
  children: string;
  customCss?: Interpolation<Theme>;
}) {
  return <StyledText24 css={customCss}>{children}</StyledText24>;
}
