import styled from "@emotion/styled";
import Title from "../components/Title";
import iphone_mockup from "@/assets/iphone_mockup.png";
import { useNavigate } from "react-router";

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
    // opacity: 0.6,
  });

  const Iframe = styled.iframe({
    position: "absolute",
    left: "21px",
    top: "18.7px",
    width: "calc(100% - 41px)",
    height: "calc(100% - 42px)",
    border: "0px",
    borderRadius: "40px",
  });

  const DescriptionContainer = styled.div({
    padding: "20px",
  });

  const Description = styled.div({
    marginTop: "20px",
  });

  const Test = styled.div({
    fontSize: "20px",
    fontWeight: 700,
    border: "1px solid black",
  });

  const ProjectContainer = styled.div({ display: "flex" });
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/test");
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        minHeight: "100%",
        overflow: "hidden",
      }}
    >
      <Test
        onClick={() => {
          // router.push("/anxy/home");
          onClick();
        }}
      >
        모바일
      </Test>
      <ProjectContainer>
        <IphoneContainer>
          <IphoneImage src={iphone_mockup} alt={"iphone_mockup"}></IphoneImage>

          <Iframe
            // src="http://172.30.1.87:5173/test"
            src="http://172.30.1.87:5173/test"
            width="100%"
            allowFullScreen
          ></Iframe>
        </IphoneContainer>
        <DescriptionContainer>
          <Title />
          <Description>
            {[
              "불안 관리 앱 Anxy입니다.",
              `"'사람들이 정말로 꾸준히 사용하는 디지털 도구’를 만들어 인류의
          정신건강에 기여한다" 라는 목표 아래 수많은 가설들을 테스트하는
          과정에서 사람들의 반응이 가장 좋았던 아이디어를 발전시켜 나갔습니다.`,
              `빠른 검증을 위해 모든 화면을 웹뷰로 개발했고, 그에 따라 화면
          레이아웃과 네비게이션 시스템을 만들었습니다.`,
              `친근하고 자연스러운
          사용자 경험을 위해 애니메이션 컴포넌트를 다수 구현했습니다.`,
            ].map((each, index) => (
              <div key={index}>{`∙ ${each}`}</div>
            ))}
          </Description>
        </DescriptionContainer>
      </ProjectContainer>
    </div>
  );
}
