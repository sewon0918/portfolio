import styled from "@emotion/styled";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Project from "@/components/other-projects/Project";
import { Link } from "@/components/common/Link";

const projectData = [
  {
    name: "Betty",
    assetDirectory: "assets/betty",
    screenshots: ["1.png", "2.png", "3.png"],
    devDuration: "2022.10 - 2023.2",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "식이장애 치료를 위한 앱입니다.",
      "불안 관리 앱 Anxy와 같이 배우고, 기록하며 식이장애를 유발하는 뿌리깊은 생각을 찾도록 도와줍니다.",
    ],
  },
  {
    name: "Loomy",
    assetDirectory: "assets/loomy",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    devDuration: "2022.12",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "우울증을 위한 앱입니다.",
      "불안 관리 앱 Anxy와 같이 배우고, 기록하며 식이장애를 유발하는 뿌리깊은 생각을 찾도록 도와줍니다.",
    ],
  },
  {
    name: "Somny",
    assetDirectory: "assets/somny",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    devDuration: "2022.11",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
    description: [
      "수면 문제 치료를 위한 앱입니다.",
      "불안 관리 앱 Anxy와 같이 배우고, 기록하며 규칙적인 수면 습관을 기르도록 도와줍니다.",
    ],
  },
  {
    name: "Socrates",
    assetDirectory: "assets/socrates",
    screenshots: ["1.png", "2.png", "3.png"],
    devDuration: "2023.4",
    techStack: "React, Typescript, Recoil, Tailwindcss, Framer-motion",
    description: [
      "글로벌 시장을 타겟으로 한 저널링 서비스입니다. ",
      "AI와 대화하며 자신의 생각을 정리하고 기록하는 것을 도와줍니다.",
    ],
  },
  {
    name: "Wallflower Society",
    assetDirectory: "assets/wallflower_society",
    screenshots: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
    ],
    devDuration: "2023.5",
    techStack:
      "React Native, TypeScript, Expo, Recoil, Sentry, AppsFlyer, Legend-motion",
    description: [
      "글로벌 시장을 타겟으로 한 사회불안을 위한 챌린지 서비스입니다.",
      "사용자는 ",
    ],
  },
  {
    name: "Distancing Isolation Tool",
    assetDirectory: "assets/distancing_isolation",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    devDuration: "2024.7",
    techStack: "React, Typescript, Recoil, Jou-UI, Framer-motion",
    description: [""],
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
              사람들의 마음은 갈수록 척박해지고 있습니다. 전세계적으로 항우울제
              산업에 수백 조의 돈을 쏟아붓고 있지만 정신건강 수치는 지속적으로
              악화되고 있고, 대한민국의 우울증 유병률은 OECD 국가 중 1위를
              기록하고 있죠.
              <br /> 저희는 사람들에게 더 쉽고 효과적으로 자신의 마음을 관리할
              수 있는 새로운 도구가 필요하다고 생각했어요. 수많은 테스트를 하며
              "효과 있는, 동시에 사람들이 정말로 꾸준히 사용하는 디지털 도구" 를
              찾아 나섰습니다. ‘총알 먼저 쏘고 대포를 쏜다’ 라는 규칙 하에 작은
              단위부터 단계적으로 검증해나가며, 발전시킬만한 아이디어라고
              판단되는 경우에 한해 피드백을 반영해 제품을 발전시켰습니다.
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
                  <div>
                    <Project
                      key={name}
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
