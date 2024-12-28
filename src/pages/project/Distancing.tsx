import ProjectTemplate from "./ProjectTemplate";

export default function Distancing() {
  return (
    <ProjectTemplate
      pathname={"/distancing"}
      title={"Distancing"}
      description={[
        "코치와 함께하는 디지털 인지치료 프로그램입니다",
        "코치가 매일 개인화된 활동지를 제공하고, 완료한 활동지에는 코멘트를 달아줍니다.",
        "활동지에 새로운 컴포넌트가 들어와도 쉽게 추가할 수 있도록 확장성있게 개발했습니다.",
        "변동성이 큰 활동지를 쉽게 관리할 수 있도록 활동지별로 텍스트 파일을 버전 별로 관리했습니다.",
        "앱과 웹, 코치와 유저의 화면을 한 벌로 관리할 수 있도록 설계했습니다.",
        "코치와 유저가 같은 활동지를 수정할 수 있도록 설계했습니다.",
      ]}
    ></ProjectTemplate>
  );
}
