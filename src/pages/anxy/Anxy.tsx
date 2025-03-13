import ProjectTemplate from "../template/ProjectTemplate";

export default function Anxy() {
  return (
    <ProjectTemplate
      pathname={"/anxy"}
      title={"Anxy"}
      devDuration={"2022.9 - 2023.4"}
      techStack={
        "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
      }
      description={{
        ABOUT: [
          "불안 관리 솔루션입니다. 사용자는 불안에 대해 배우고, 자신의 불안을 기록하고 회고하며 불안을 다스리는 방법을 배웁니다. 함께하는 서로를 응원하며 동기를 부여합니다.",
        ],
        IMPROVED: [
          `웹뷰를 전체 화면으로 렌더링해 노치 및 헤더와의 부자연스러운 연결 문제를 해결하고, 화면 레이아웃과 헤더 시스템을 재구축했습니다.`,
          "Context API의 단점을 극복하기 위해 Recoil을 도입했습니다.",
          "코드의 안정성과 유지보수를 위해 프로젝트를 TypeScript로 전환했습니다.",
        ],

        "KEY FEATURES": [
          `빠른 검증을 위해 모든 화면을 웹뷰로 개발했습니다.`,
          `iOS에서 키보드가 웹뷰를 밀어올리는 문제를 해결하고, 네비게이션 전환 효과를 추가하는 등 웹뷰의 한계를 극복하고, 네이티브 앱처럼 부드러운 사용자 경험을 제공하기 위해 노력했습니다.`,
          `Lottie와 Framer Motion을 활용해 친근하고 자연스러운 애니메이션 컴포넌트를 다수 개발했습니다.`,
          "동일한 설계를 식이장애 관리(Betty), 수면 관리(Somny), 우울 관리(Loomy) 솔루션에도 적용했으며, monorepo 구조를 도입해 코드베이스를 효율적으로 관리했습니다.",
        ],
      }}
      appStoreLink={
        "https://apps.apple.com/kr/app/anxy-no-worries/id6443537001"
      }
    ></ProjectTemplate>
  );
}
