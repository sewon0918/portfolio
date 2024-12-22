import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import Button from "@/components/common/Button";

export default function Distancing() {
  const IphoneContainer = styled.div({
    position: "relative",
    borderRadius: "100px",
    minWidth: "375px",
    width: "375px",
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
    padding: "20px",
  });

  const Description = styled.div({
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "24px",
    opacity: 0.3,
  });

  const ProjectContainer = styled.div({ display: "flex" });
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path");
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path]);

  const goDistancing = () => {
    navigate("/distancing");
  };

  return (
    <div
      css={css({
        backgroundColor: "white",
        padding: "20px 60px",
        minHeight: "100%",
        overflow: "hidden",
      })}
    >
      {/* <TestLink
        onClick={() => {
          onClick();
        }}
      >
        모바일
      </TestLink> */}
      <ProjectContainer>
        <IphoneContainer>
          <IphoneImage src={iphone_mockup} alt={"iphone_mockup"}></IphoneImage>

          <Iframe
            src={`${window.location.origin}/portfolio/?path=/distancing`}
            // src="http://192.0.0.2:5173/anxy"
            // src="http://172.29.112.138:5173/anxy"
            width="100%"
            allowFullScreen
          ></Iframe>
        </IphoneContainer>
        <DescriptionContainer>
          <Title title="Distancing" />
          <Button buttonText="데스크탑 버전" onClick={goDistancing} />
          <Description>
            {["코치와 함께하는 디지털 인지치료 프로그램입니다"].map(
              (each, index) => (
                <div key={index}>{`∙ ${each}`}</div>
              )
            )}
          </Description>
        </DescriptionContainer>
      </ProjectContainer>
      {/* <ProjectContainer>
        <div
          css={{
            position: "relative",
            width: "1030px",
            height: "750px",
            borderRadius: "20px",
            border: "14px solid black",
            backgroundColor: "black",
          }}
        >
          <iframe
            src={`${window.location.origin}/portfolio/?path=/distancing`}
            width="100%"
            allowFullScreen
            css={{
              width: "100%",
              height: "100%",
              border: "0px",
              borderRadius: "10px",
            }}
          />
        </div>
      </ProjectContainer> */}
    </div>
  );
}
