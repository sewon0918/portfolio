import ProjectTemplate from "./ProjectTemplate";

export default function Distancing() {
  return (
    <ProjectTemplate
      pathname={"/distancing"}
      title={"Distancing"}
      hasDesktopVersion
      devDuration={"2023.8 - 2024.12"}
      techStack={
        "React, Typescript, Material-UI, Joy-UI, React-query, Expo, React-native"
      }
      description={{
        ABOUT: [
          "코치와 함께하는 디지털 인지치료 프로그램입니다. 코치는 매일 개인화된 활동지를 제공하고, 완료한 활동지에는 코멘트를 달아줍니다.",
          // "제품을 개발하기 전 구글 스프레드 시트로 프로그램을 진행했고, 리텐션 검증 후에 제품 개발을 시작하여 단계적으로 개발했습니다.",
        ],
        IMPROVED: [
          "활동지 데이터의 로드를 효율적으로 하기 위해 react-query를 도입했습니다. ",
          "네이티브 모듈을 사용해 웹뷰의 한계를 극복했습니다. 예를 들어, 웹뷰가 오랜 시간 백그라운드에 들어가는 경우 음성파일이 끊기는 문제를 해결하기 위해 네이티브 라이브러리를 사용했습니다.",
        ],

        "KEY FEATURES": [
          "하단 탭과 채팅 기능은 React Native로, 나머지는 웹뷰로 개발하여 하이브리드 앱 아키텍처 완성.",
          "Material Design의 UI/UX 원칙을 준수하며, 빠른 프로토타이핑을 위해 Joy UI를 사용했습니다.",
          "활동지에 새로운 컴포넌트가 들어와도 쉽게 확장 가능하도록 설계했습니다.",
          "변동성이 큰 활동지의 텍스트를 쉽게 관리할 수 있도록 버전 별로 관리했고, i18n를 적용해 영어 사용자를 지원하도록 했습니다.",
          "앱과 데스크탑에서 모두 사용할 수 있도록 반응형으로 개발했습니다.",
          "코치와 유저의 화면을 한 벌로 관리할 수 있도록, 코치와 유저가 같은 활동지를 수정할 수 있도록 설계했습니다.",
        ],
      }}
      appStoreLink={
        "https://apps.apple.com/kr/app/디스턴싱-distancing-마음-문제-해결/id6471821968"
      }
      playStoreLink={
        "https://play.google.com/store/apps/details?id=com.orwellhealth.distancing&hl=ko-KR"
      }
    ></ProjectTemplate>
  );
}
