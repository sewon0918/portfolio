import styled from "@emotion/styled";

const Page = styled.div({
  fontSize: "40px",
  fontWeight: 700,
  backgroundColor: "transparent",
  borderWidth: "0px",
  "&:hover": {
    // '&' 기호를 문자열로 감싸기
    cursor: "pointer",
    backgroundColor: "transparent", // camelCase로 변경
    textDecoration: "underline", // camelCase로 변경
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
