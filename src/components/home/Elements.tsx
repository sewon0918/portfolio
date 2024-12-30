import Duration from "@/components/common/Duration";
import { Link } from "../common/Link";

export const About = () => {
  return (
    <div
      css={{
        display: "flex",
        gap: "20px",
      }}
    >
      <div css={{ fontWeight: 600 }}>ABOUT</div>
      <div>Sewon Lim</div>
    </div>
  );
};

export const Instruction = () => {
  return (
    <div>
      안녕하세요. 프론트엔드 개발자 임세원입니다. 3년간 프론트엔드 개발자로
      다양한 프로젝트에 참여하며 웹과 모바일 환경에서 뛰어난 사용자 경험을
      제공하는 데 집중해왔습니다. 웹 개발로 시작해 점차 웹뷰과 네이티브 앱
      개발까지 범위를 확장하며, 각 단계에서 발생한 기술적 도전을 해결했습니다.
      특히 지난 1년 반 동안 모든 클라이언트 부분을 혼자서 개발, 운영해왔고, 그
      과정에서 발생하는 문제들을 빠르게 파악하고 해결해왔습니다. <br />
      창의적으로 해결책을 찾아내는 데 자신이 있으며, 새로운 기술을 배우고
      발전하는 데 열정을 가지고 있습니다. 효율적이고 직관적인 UI/UX를 구현하는
      데 강점을 가지고 있습니다.
    </div>
  );
};

export const Career = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {[
        {
          career: "KAIST 전산학부 학사",
          duration: { from: "2017.3", to: "2022.2" },
        },
        {
          career: "Orwell Health",
          link: "https://orwell.distancing.im/",
          duration: { from: "2022.4", to: "2024.12" },
        },
      ].map(({ career, link, duration: { from, to } }) => (
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!link ? <div>{career}</div> : <Link link={link}>{career}</Link>}

          <Duration from={from} to={to} />
        </div>
      ))}
    </div>
  );
};
