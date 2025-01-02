import ProjectTemplate from "./ProjectTemplate";

export default function Anxy() {
  return (
    <ProjectTemplate
      pathname={"/anxy"}
      title={"ANXY"}
      devDuration={"2022.9 - 2023.4"}
      techStack={
        "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
      }
      description={{
        ABOUT: [
          "불안 관리 서비스입니다. 사용자는 불안에 대해 배우고, 자신의 불안을 기록하고 회고하며 불안을 다스리는 방법을 배웁니다. 함께하는 서로를 응원합니다.",
          // `"'사람들이 정말로 꾸준히 사용하는 디지털 도구'를 만들어 인류의
          //     정신건강에 기여한다" 라는 목표 아래 수많은 가설들을 테스트하는
          //     과정에서 사람들의 반응이 가장 좋았던 아이디어를 발전시켜 나간 서비스입니다.`,
          // `수많은 L/O(Landing/Onboarding)테스트를 통해 사용자들의 반응을 확인하며 개선해 나갔습니다. `,
        ],
        IMPROVED: [
          `노치와 헤더를 앱으로 그렸을 때 부자연스러운 문제를 해결하기 위해 웹뷰를 전체 화면으로 그리면서 화면 레이아웃과 헤더 시스템을 구축했습니다.`,
          "context api의 단점을 극복하기 위해 recoil을 도입했습니다.",
          "코드의 안정성을 위해 typescript로 전환했습니다.",
        ],

        "KEY FEATURES": [
          `빠른 검증을 위해 모든 화면을 웹뷰로 개발했습니다.`,
          `ios 에서 키보드가 웹뷰를 밀어올리는 문제를 해결하고, 네비게이션 시 트랜지션을 적용하는 등 웹뷰의 한계를 극복하고, 네이티브 앱처럼 부드러운 사용자 경험 제공하기 위해 노력했습니다.`,
          `친근하고 자연스러운 ui를 위해 lottie와 framer-motion을 이용한 애니메이션 컴포넌트를 다수 구현했습니다.`,
          `이후 수면 앱 Somny, 식이장애 앱 Betty, 우울 관리 앱 Loomy 에서도 동일한 설계를 활용했고, monorepo 구조를 도입하여 코드베이스를 효율적으로 관리할 수 있도록 했습니다.`,
        ],
      }}
      appStoreLink={
        "https://apps.apple.com/kr/app/anxy-no-worries/id6443537001"
      }
    ></ProjectTemplate>
  );
}
