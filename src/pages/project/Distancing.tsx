import { Link } from "react-router";
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
          "코치와 함께하는 디지털 인지치료 프로그램입니다. 코치는 매일 개인 맞춤형 활동지를 제공하며, 사용자가 활동지를 완료하면 이에 대해 코멘트를 달아줍니다.",
        ],
        IMPROVED: [
          "활동지 데이터를 효율적으로 처리하고 불필요한 네트워크 요청을 줄이기 위해 react-query를 도입했습니다. ",
          "웹뷰의 한계를 극복하기 위해 네이티브 모듈을 활용했습니다. 예를 들어, 웹뷰가 오랜 시간 백그라운드로 전환될 때 음성 파일이 끊기는 문제를 네이티브 라이브러리를 통해 해결했습니다.",
        ],

        "KEY FEATURES": [
          "하단 탭과 채팅 기능은 React Native로 개발하고, 나머지는 웹뷰를 사용하여 구현했습니다.",
          <p css={{ display: "inline" }}>
            활동지에 새로운 컴포넌트가 추가되더라도 쉽게 확장할 수 있는 구조로
            설계했습니다.(
            <Link css={{ color: "#131314" }} to="detail">
              상세
            </Link>
            )
          </p>,
          "Material Design의 UI/UX 원칙을 준수하며, 빠른 프로토타이핑을 위해 Joy UI를 사용했습니다.",
          "변동성이 큰 활동지의 텍스트를 버전별로 관리하고, i18n를 적용해 영어 사용자를 지원했습니다.",
          "앱과 데스크톱 모두에서 사용 가능하도록 반응형 레이아웃으로 개발했습니다.",
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
