import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { useEffect, useRef, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router";
import { addAlpha } from "@/utils/helpers";
import PageContainer from "@/components/common/PageContainer";

export default function ProjectTemplate({
  pathname,
  title,
  devDuration,
  techStack,
  description,
  hasDesktopVersion,
}: {
  pathname: string;
  title: string;
  devDuration: string;
  techStack: string;
  description: { [key: string]: string[] };
  hasDesktopVersion?: boolean;
}) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [iphoneMaxHeight, setIphoneMaxHeight] = useState<number>();

  useEffect(() => {
    setIphoneMaxHeight(containerRef.current?.offsetHeight);
  }, [containerRef.current?.offsetHeight]);

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
  const IphoneContainer = styled.div({
    position: "relative",
    marginLeft: "40px",
    borderRadius: "100px",
    minWidth: "375px",
    width: "375px",
    scale: Math.min((iphoneMaxHeight || 0) / 764, 1),
  });

  const IphoneImage = styled.img({
    zIndex: 2,
    position: "relative",
    pointerEvents: "none",
    width: "100%",
  });

  const Iframe = styled.iframe({
    position: "absolute",
    left: "21px",
    top: "18.7px",
    width: "calc(100% - 41px)",
    height: "calc(100% - 41px)",
    border: "0px",
    borderRadius: "40px",
  });

  const DescriptionContainer = styled.div({
    flex: 1,
    height: isMobile ? "100%" : `${Math.min(iphoneMaxHeight || 764, 764)}px`,
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

  const OpenPageButton = () => {
    return (
      <div
        css={{ fontSize: "24px", paddingTop: "10px" }}
        onClick={() => {
          navigate(pathname);
        }}
      >
        <OpenInNewRoundedIcon />
      </div>
    );
  };
  const ScrollIndicator = () => {
    return (
      <>
        <TopScrollIndicator />
        <BottomScrollIndicator />
      </>
    );
  };

  return (
    <PageContainer>
      <PrpjectLayout>
        <ProjectContainer ref={containerRef}>
          {!isMobile && (
            <IphoneContainer>
              <IphoneImage
                src={iphone_mockup}
                alt={"iphone_mockup"}
              ></IphoneImage>

              <Iframe
                src={`${window.location.origin}${pathname}`}
                width="100%"
                allowFullScreen
              ></Iframe>
            </IphoneContainer>
          )}

          <DescriptionContainer>
            <ScrollIndicator />
            <DescriptionScrollArea>
              <TitleContainer>
                <Title title={title} />
                {(isMobile || (!isMobile && hasDesktopVersion)) && (
                  <OpenPageButton />
                )}
              </TitleContainer>

              <Description>{devDuration}</Description>
              <Description>{techStack}</Description>
              {Object.entries(description).map(([key, value]) => (
                <Description key={key}>
                  <div>{key}</div>
                  {value.map((each, index) => (
                    <div key={index}>{`∙ ${each}`}</div>
                  ))}
                </Description>
              ))}
            </DescriptionScrollArea>
          </DescriptionContainer>
        </ProjectContainer>
      </PrpjectLayout>
      {/* </div> */}
    </PageContainer>
  );
}
