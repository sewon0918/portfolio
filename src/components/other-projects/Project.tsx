import styled from "@emotion/styled";
import Title from "@/components/Title";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";

export default function Project({
  name,
  devDuration,
  techStack,
}: {
  name: string;
  devDuration: string;
  techStack: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const PrpjectLayout = styled.div({
    flex: 1,
    padding: isMobile ? 0 : "20px 0 0 0",
    overflow: "hidden",
    display: "flex",
  });

  const ProjectContainer = styled.div({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const DescriptionContainer = styled.div({
    flex: 1,
    height: "100%",
    maxWidth: "800px",
    overflow: "hidden",
    position: "relative",
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

  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <div
        css={{
          flex: 1,
          minWidth: "300px",
          height: "300px",
          padding: "20px",
        }}
      >
        <div
          css={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
          }}
        ></div>
      </div>
      <div css={{ flex: 1, minWidth: "300px", padding: "20px" }}>
        <Title title={name} />
        <Description>{devDuration}</Description>
        <Description>{techStack}</Description>
      </div>
    </div>
  );
}
