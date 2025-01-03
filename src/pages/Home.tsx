import styled from "@emotion/styled";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";
import Projects from "@/components/home/Projects";
import { About, Career, Instruction } from "@/components/home/Elements";

export default function Home() {
  const ScrollIndicator = styled.div({
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
    flexDirection: "column",
    position: "relative",
  });

  const FlexContainer = styled.div({
    flex: 1,
    maxWidth: "1000px",
    margin: "0 auto",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBottom: "20px",
  });

  return (
    <PageContainer noBottomPadding>
      <Wrapper>
        <ScrollIndicator />
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
      </Wrapper>
    </PageContainer>
  );
}
