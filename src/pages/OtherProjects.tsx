import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { useEffect, useRef, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Project from "@/components/other-projects/Project";

export default function OtherProjects() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const DescriptionContainer = styled.div({
    flex: 1,
    height: "100%",
    maxWidth: "800px",
    overflow: "hidden",
    position: "relative",
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

  const TitleContainer = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  });

  const DescriptionScrollArea = styled.div({
    width: "100%",
    height: "100%",
    padding: "20px 40px 80px 40px",
    overflow: "auto",
  });

  const Description = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    wordBreak: "keep-all",
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
            <Project
              name={"Betty"}
              devDuration={"2022.10 - 2023.2"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
            <Project
              name={"Loomy"}
              devDuration={"2022.12"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
            <Project
              name={"Somny"}
              devDuration={"2022.12"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
            <Project
              name={"Socates"}
              devDuration={"2022.12"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
            <Project
              name={"Wallflower Society"}
              devDuration={"2022.12"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
            <Project
              name={"Distancing Isolation Tool"}
              devDuration={"2022.12"}
              techStack={
                "React, Typescript, Recoil, Tailwindcss, Framer-motion, Monorepo"
              }
            />
          </div>
        </ProjectContainer>
      </ProjectLayout>
    </PageContainer>
  );
}
