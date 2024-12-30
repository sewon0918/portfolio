import styled from "@emotion/styled";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Project from "@/components/other-projects/Project";

const projectData = [
  {
    name: "Betty",
    assetDirectory: "assets/betty",
    screenshots: ["1.png", "2.png", "3.png"],
    devDuration: "2022.10 - 2023.2",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
  },
  {
    name: "Loomy",
    assetDirectory: "assets/loomy",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    devDuration: "2022.12",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
  },
  {
    name: "Somny",
    assetDirectory: "assets/somny",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    devDuration: "2022.11",
    techStack:
      "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo",
  },
  {
    name: "Socrates",
    assetDirectory: "assets/socrates",
    screenshots: ["1.png", "2.png", "3.png"],
    devDuration: "2023.4",
    techStack: "React, Typescript, Recoil, Tailwindcss, Framer-motion",
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
  },
  {
    name: "Distancing Isolation Tool",
    assetDirectory: "assets/distancing_isolation",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    devDuration: "2024.7",
    techStack: "React, Typescript, Recoil, Jou-UI, Framer-motion",
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
      <>
        <TopScrollIndicator />
        <BottomScrollIndicator />
      </>
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
            {projectData.map(
              ({
                name,
                devDuration,
                techStack,
                assetDirectory,
                screenshots,
              }) => (
                <Project
                  key={"name"}
                  name={name}
                  devDuration={devDuration}
                  techStack={techStack}
                  screenshots={screenshots.map(
                    (each) => `${assetDirectory}/${each}`
                  )}
                />
              )
            )}
          </div>
        </ProjectContainer>
      </ProjectLayout>
    </PageContainer>
  );
}
