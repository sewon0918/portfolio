import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { isMobile } from "react-device-detect";

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
  console.log(isMobile);
  const containerRef = useRef<HTMLDivElement>(null);

  const [iphoneMaxHeight, setIphoneMaxHeight] = useState<number>();

  useEffect(() => {
    setIphoneMaxHeight(containerRef.current?.offsetHeight || 764);
  }, [containerRef.current?.offsetHeight]);

  const ProjectContainer = styled.div({
    paddingLeft: "40px",
    flex: 1,
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
  });
  const IphoneContainer = styled.div({
    position: "relative",
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
    padding: "40px 40px 40px 0",
    maxWidth: "800px",
    alignSelf: "stretch",
    overflow: "scroll",
  });

  const Description = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    wordBreak: "keep-all",
  });

  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path]);

  return (
    <div
      css={css({
        backgroundColor: "white",
        padding: "40px 0",
        minHeight: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div css={{ fontWeight: 600, textAlign: "center" }}>PORTFOLIO</div>
      <div
        css={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
        }}
      >
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
            <div css={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Title title={title} />
              {isMobile && (
                <div
                  css={{ fontSize: "24px", paddingTop: "10px" }}
                  onClick={() => {
                    navigate(pathname);
                  }}
                >
                  <OpenInNewRoundedIcon />
                </div>
              )}
              {hasDesktopVersion && (
                <div
                  css={{ fontSize: "24px", paddingTop: "10px" }}
                  onClick={() => {
                    navigate(pathname);
                  }}
                >
                  <OpenInNewRoundedIcon />
                </div>
              )}
            </div>

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
          </DescriptionContainer>
        </ProjectContainer>
      </div>
    </div>
  );
}
