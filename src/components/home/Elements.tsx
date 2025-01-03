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
      안녕하세요, 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자
      임세원입니다. 지난 3년간 웹과 모바일 환경에서 뛰어난 사용자 경험을
      제공하는 데 집중하며, 다양한 프로젝트에 참여해 왔습니다. 초기에는 웹
      개발을 시작으로, 점차 웹뷰와 네이티브 앱 개발까지 범위를 확장하며 다양한
      플랫폼에서의 기술적 도전을 해결해왔습니다. <br />
      특히 지난 1년 반 동안 클라이언트 영역을 단독으로 개발 및 운영하며, 그
      과정에서 발생하는 문제를 빠르게 파악하고 해결하는 역량을 쌓았습니다. 작고
      빠른 스타트업의 초기 멤버로 함께한 만큼 문제를 발견하고, 가설을 세우고,
      이를 검증하는 프로세스에 익숙하며, 주어진 개발을 넘어 창의적인 해결책을
      제시하는 데 열정을 가지고 있습니다.
      <br /> 또한, UI/UX를 세밀하게 설계하고 애니메이션과 동적 인터랙션을 적절히
      활용하여 사용자의 만족도를 높이는 일을 좋아합니다. 사용자와 비즈니스
      모두가 만족할 수 있는 솔루션을 구현하는 데 기여하고 싶습니다.
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
          key={career}
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
