import styled from "@emotion/styled";

const StyledTitle = styled.div({
  fontSize: "50px",
  color: "black",
  fontWeight: 700,
  height: "fit-content",
});

export default function Title({ title }: { title: string }) {
  return <StyledTitle>{title}</StyledTitle>;
}
