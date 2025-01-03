import styled from "@emotion/styled";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Projects from "@/components/home/Projects";
import { About, Career, Instruction } from "@/components/home/Elements";
import { ScrollRestoration } from "react-router";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import Header from "@/components/common/Header";
import { Link } from "@/components/common/Link";

export default function Home() {
  const ScrollIndicator = styled.div({
    width: "100%",
    height: "40px",
    background: `linear-gradient(to bottom, #ffffff, ${addAlpha(
      "#ffffff",
      0
    )})`,
  });

  const HalfContainer = styled.div({
    flex: 1,
    padding: "40px",
  });

  const SelfInstruction = styled.div({
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    "& > div:not(:last-child)::after": {
      content: '""',
      height: "1px",
      backgroundColor: "gray",
      display: "block",
      margin: "30px 0",
    },
  });

  const Wrapper = styled.div({
    flex: 1,

    overflow: "hidden",
    display: "flex",
    position: "relative",
  });

  const FlexContainer = styled.div({
    flex: 1,
    // minHeight: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    // overflow: "auto",
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    flexWrap: "wrap",
    alignItems: "center",
  });

  return (
    <div
      css={{
        width: "100%",
        height: "calc(var(--vh,1vh) * 100)",
        overflow: "auto",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          position: "sticky",
          width: "100%",
          top: 0,
        }}
      >
        <div
          css={{
            width: "100%",
            padding: isMobile ? "20px 0 0 0" : `40px 0 ${0} 0`,
            backgroundColor: "white",
          }}
        >
          <Header />
        </div>
        <ScrollIndicator />
      </div>

      <FlexContainer>
        <HalfContainer>
          <SelfInstruction>
            <About />
            <Instruction />
            <Career />
          </SelfInstruction>
        </HalfContainer>
        <HalfContainer>
          <Projects />
        </HalfContainer>
      </FlexContainer>
    </div>
  );
}
