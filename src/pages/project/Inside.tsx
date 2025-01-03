import ProjectTemplate from "./ProjectTemplate";

export default function Inside() {
  return (
    <ProjectTemplate
      pathname={"/inside/begin"}
      title={"Inside"}
      devDuration={"2022.4 - 2022.9"}
      techStack={"React, Javascript, Context API, Tailwindcss, Framer-motion"}
      description={{
        ABOUT: [
          "화상 상담 서비스입니다. 사용자는 자신의 니즈에 맞는 상담사를 찾아 상담 일정을 예약한 뒤 예약된 시간에 화상 상담을 진행합니다.",
        ],

        "KEY FEATURES": [
          "리텐션을 높이기 위한 목적으로 상담 외 시간에 혼자서 진행하는 워크북 기능을 추가하면서 빠른 배포를 위해 네이티브 앱에 웹뷰를 도입했습니다.",
          "점차 웹뷰의 비중을 높여갔고, 퀴즈, 자가검사, 수면 기록, 검사 결과나 기록의 추이를 보여주기 위한 차트 등의 다양한 기능과 컴포넌트를 개발했습니다.",
          "온보딩 과정에서 몰입감 있는 사용자 경험을 위해 각 질문마다 페이지를 분리하지 않고, 스크롤되는 듯한 인터랙션을 구현했습니다. 이에 맞게 스와이프 제스처를 통해 이전 질문으로 돌라갈 수 있도록 하여 모바일 사용자 경험을 개선했습니다. ",
        ],
      }}
    ></ProjectTemplate>
  );
}
