import styled from "@emotion/styled";

const StyledTitle = styled.div({
  fontSize: "50px",
  color: "black",
  fontWeight: 700,
  height: "fit-content",
});

export default function Title() {
  return <StyledTitle>{"ANXY"}</StyledTitle>;
}
