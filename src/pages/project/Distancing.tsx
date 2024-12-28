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
            // src={`${window.location.origin}/portfolio/?path=/distancing`}
            src={`${window.location.origin}/?path=/distancing`}
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
            {[
              "코치와 함께하는 디지털 인지치료 프로그램입니다",
              "코치가 매일 개인화된 활동지를 제공하고, 완료한 활동지에는 코멘트를 달아줍니다.",
              "활동지에 새로운 컴포넌트가 들어와도 쉽게 추가할 수 있도록 확장성있게 개발했습니다.",
              "변동성이 큰 활동지를 쉽게 관리할 수 있도록 활동지별로 텍스트 파일을 버전 별로 관리했습니다.",
              "앱과 웹, 코치와 유저의 화면을 한 벌로 관리할 수 있도록 설계했습니다.",
              "코치와 유저가 같은 활동지를 수정할 수 있도록 설계했습니다.",
            ].map((each, index) => (
              <div key={index}>{`∙ ${each}`}</div>
            ))}
          </Description>
        </DescriptionContainer>
      </ProjectContainer>
    </div>
  );
}
