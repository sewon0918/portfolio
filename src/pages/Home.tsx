import styled from "@emotion/styled";
import Title from "@/components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { css } from "@emotion/react";

export default function Home() {
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
            src={`${window.location.origin}/portfolio/anxy`}
            // src="http://192.0.0.2:5173/anxy"
            // src="http://172.29.112.138:5173/anxy"
            width="100%"
            allowFullScreen
          ></Iframe>
        </IphoneContainer>
        <DescriptionContainer>
          <Title />
          <Description>
            {[
              "불안 관리 앱 Anxy입니다.",
              `'사람들이 정말로 꾸준히 사용하는 디지털 도구'를 만들어 인류의
          정신건강에 기여한다" 라는 목표 아래 수많은 가설들을 테스트하는
          과정에서 사람들의 반응이 가장 좋았던 아이디어를 발전시켜 나간 서비스입니다.`,
              `빠른 검증을 위해 모든 화면을 웹뷰로 개발했고, 그에 따라 화면
          레이아웃과 네비게이션 시스템을 구축했습니다.`,
              `친근하고 자연스러운
          사용자 경험을 위해 lottie와 framer-motion을 이용한 애니메이션 컴포넌트를 다수 구현했습니다.`,
              `웹뷰의 한계를 극복하고, 네이티브 앱처럼 자연스러운 사용자 경험을 제공하기 위한 노력 (예: 키보드 상단 고정, 네비게이션 트랜지션 문제 해결, ui 트랜지션)`,
              `이후 개발한 수면 앱 Somny, 식이장애 앱 Betty 등에서도 사용할 수 있도록 컴포넌트 기반으로 개발했습니다.`,
            ].map((each, index) => (
              <div key={index}>{`∙ ${each}`}</div>
            ))}
          </Description>
        </DescriptionContainer>
      </ProjectContainer>
    </div>
  );
}
