import styled from "@emotion/styled";

const Page = styled.div({
  fontSize: "40px",
  fontWeight: 700,
  backgroundColor: "transparent",
  borderWidth: "0px",
  // fontFamily: "Arial, sans-serif",
  fontFamily: "Noto Sans, serif",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "transparent",
    textDecoration: "underline",
    color: "orange",
    // transition: all 0.1s ease; // 부드러운 전환 효과 추가
  },
});

export default function Button({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) {
  return <Page onClick={onClick}>{buttonText}</Page>;
}
