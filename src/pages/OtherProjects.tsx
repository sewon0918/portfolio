import styled from "@emotion/styled";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Project from "@/components/other-projects/Project";
import { Link } from "@/components/common/Link";

const projectData = [
  {
    name: "Betty",
    assetDirectory: "assets/betty",
    screenshots: ["1.webp", "2.webp", "3.webp"],
    devDuration: "2022.10 - 2023.2",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "식이장애 관리 솔루션입니다.",
      "사용자가 식이장애에 대해 배우고, 기록하며 식사 패턴을 파악하고 식이장애에서 벗어날 수 있도록 돕습니다.",
    ],
  },
  {
    name: "Somny",
    assetDirectory: "assets/somny",
    screenshots: ["demo.mp4", "1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    devDuration: "2022.11",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "수면 관리 솔루션입니다.",
      "사용자의 수면 패턴에 맞게 솔루션을 제공하고,규칙적인 수면 습관을 기르도록 돕습니다.",
    ],
  },
  {
    name: "Loomy",
    assetDirectory: "assets/loomy",
    screenshots: [
      "demo.mp4",
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
    ],
    devDuration: "2022.12",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "우울 관리 솔루션입니다.",
      '"마음의 날씨를 바꾼다"는 컨셉으로 게임처럼 우울을 관리할 수 있도록 돕습니다.',
    ],
  },
  {
    name: "Socrates",
    assetDirectory: "assets/socrates",
    screenshots: ["1.webp", "2.webp", "3.webp"],
    devDuration: "2023.4",
    techStack: "React, Typescript, Recoil, Tailwindcss, Framer-motion",
    description: [
      "글로벌 시장을 타겟으로 한 저널링 서비스입니다. ",
      "뿌리깊은 생각을 꺼내볼 수 있는 AI의 질문에 답하며 생각을 정리할 수 있도록 도와줍니다.",
      "하루만에 개발했고, 세 번의 문답 이후 이메일을 받는 방식으로 사용자들의 반응을 테스트 했습니다. ",
    ],
  },
  {
    name: "Wallflower Society",
    assetDirectory: "assets/wallflower_society",
    screenshots: ["demo.mp4", "1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    devDuration: "2023.5",
    techStack:
      "React Native, TypeScript, Expo, Recoil, Sentry, AppsFlyer, Legend-motion",
    description: [
      "글로벌 시장을 타겟으로 한 사회불안 극복 챌린지 서비스입니다.",
      "사용자는 자신에게 적합한 챌린지를 선택해 진행하며, 사회적 상황에서 점진적으로 불안을 극복할 수 있습니다. 챌린지를 완료하면 그 경험을 공유하며 사람들과 소통할 수 있습니다.",
      "React Native를 사용한 첫번째 프로젝트이고, 3주 만에 스토어에 성공적으로 릴리즈했습니다.",
    ],
  },
  {
    name: "Distancing Isolation Tool",
    assetDirectory: "assets/distancing_isolation",
    screenshots: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
    devDuration: "2024.7",
    techStack: "React, Typescript, Recoil, Jou-UI, Framer-motion",
    description: [
      "디스턴싱의 개념에 관심이 있지만 모종의 이유로 제품은 사용하지 않는 사람들에게 조금 더 쉽게 제공하기 위해 만든 툴입니다.",
      "사용자가 자유롭게 기록한 생각을 바탕으로 질문을 던져 상황-생각-감정으로 분리해주며 생각을 한걸음 떨어져 볼 수 있도록 돕습니다.",
    ],
  },
];

export default function OtherProjects() {
  const ProjectLayout = styled.div({
    flex: 1,
    padding: 0,
    overflow: "hidden",
    display: "flex",
    position: "relative",
  });

  const ProjectContainer = styled.div({
    flex: 1,
    overflow: "auto",
    padding: "20px 0 60px 0",
  });

  const TopScrollIndicator = styled.div({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "40px",
    background: `linear-gradient(to bottom, #ffffff, ${addAlpha(
      "#ffffff",
      0
    )})`,
  });
  const BottomScrollIndicator = styled.div({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80px",
    background: `linear-gradient(to top, #ffffff, ${addAlpha("#ffffff", 0)})`,
  });

  const ScrollIndicator = () => {
    return (
      <div css={{ zIndex: 1, pointerEvents: "none" }}>
        <TopScrollIndicator />
        <BottomScrollIndicator />
      </div>
    );
  };

  return (
    <PageContainer noBottomPadding>
      <ProjectLayout>
        <ScrollIndicator />
        <ProjectContainer>
          <div
            css={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <div css={{ padding: "20px 40px 0 40px", wordBreak: "keep-all" }}>
              사람들의 마음은 점점 더 척박해지고 있습니다. 전 세계적으로
              항우울제 산업에 수백조 원 규모 돈을 투자하고 있지만, 정신건강
              지표는 꾸준히 악화되고 있습니다. 특히 대한민국은 OECD 국가 중
              우울증 유병률 1위라는 안타까운 기록을 가지고 있죠.
              <br />
              이러한 현실 속에서, 저희는 사람들이 더 쉽고 효과적으로 자신의
              마음을 관리할 수 있는 디지털 도구가 필요하다고 믿었습니다. 이를
              위해 수많은 실험과 테스트를 거치며 "효과 있는, 동시에 사람들이
              정말로 꾸준히 사용하는 디지털 도구"를 찾는 여정을 시작했습니다.
              "총알 먼저 쏘고, 대포를 쏜다." 라는 규칙 하에 작은 단위부터
              사용자의 피드백과 데이터를 기반으로 제품을 발전시켰습니다.
              <Link
                link={
                  "https://orwell.distancing.im/orwell-health/mental-health-improved"
                }
              >
                {"PMF 여정 알아보기"}
              </Link>
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                "& > div:not(:last-child)::after": {
                  content: '""',
                  height: "1px",
                  backgroundColor: addAlpha("#2E2B2B", 0.1),
                  display: "block",
                  margin: "40px 30px",
                },
              }}
            >
              {projectData.map(
                ({
                  name,
                  devDuration,
                  techStack,
                  assetDirectory,
                  screenshots,
                  description,
                }) => (
                  <div key={name}>
                    <Project
                      name={name}
                      devDuration={devDuration}
                      techStack={techStack}
                      screenshots={screenshots.map(
                        (each) => `${assetDirectory}/${each}`
                      )}
                      description={description}
                    />
                    {/* <div css={{ height: "1px", backgroundColor: "gray" }} /> */}
                  </div>
                )
              )}
            </div>
          </div>
        </ProjectContainer>
      </ProjectLayout>
    </PageContainer>
  );
}
