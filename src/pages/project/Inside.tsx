import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

export default function Inside() {
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

  return (
    <div
      css={css({
        backgroundColor: "white",
        padding: "20px 60px",
        minHeight: "100%",
        overflow: "hidden",
      })}
    >
      <ProjectContainer>
        <IphoneContainer>
          <IphoneImage src={iphone_mockup} alt={"iphone_mockup"}></IphoneImage>

          <Iframe
            // src={`${window.location.origin}/portfolio/?path=/inside/begin`}
            src={`${window.location.origin}/?path=/inside/begin`}
            width="100%"
            allowFullScreen
          ></Iframe>
        </IphoneContainer>
        <DescriptionContainer>
          <Title title="Inside" />
          <Description>
            {["화상상담 앱 입니다."].map((each, index) => (
              <div key={index}>{`∙ ${each}`}</div>
            ))}
          </Description>
        </DescriptionContainer>
      </ProjectContainer>
    </div>
  );
}
