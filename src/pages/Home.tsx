import { useNavigate } from "react-router";
import Button from "@/components/common/Button";

export default function Home() {
  const navigate = useNavigate();

  const goInside = () => {
    navigate("/project/inside");
  };
  const goAnxy = () => {
    navigate("/project/anxy");
  };
  const goDistancing = () => {
    navigate("/project/distancing");
  };

  return (
    <div
      css={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        padding: "40px 20px 60px 20px",
      }}
    >
      <div css={{ fontWeight: 600, textAlign: "center" }}>PORTFOLIO</div>
      <div
        css={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          css={{
            flex: 1,
            padding: "40px",
          }}
        >
          <div
            css={{
              maxWidth: "360px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              // gap: "30px",
              margin: "0 auto",
              "& > div:not(:last-child)": {
                // marginBottom: "10px", // 아이템 사이의 여백
              },
              "& > div:not(:last-child)::after": {
                content: '""',
                height: "1px", // Divider의 높이
                backgroundColor: "gray", // Divider의 색상
                display: "block", // Divider를 블록 요소로 설정
                margin: "30px 0",
              },
            }}
          >
            <div
              css={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div css={{ fontWeight: 600 }}>ABOUT</div>
              <div>Sewon Lim</div>
            </div>
            <div>
              안녕하세요. 프론트엔드 개발자 임세원입니다. 3년간 프론트엔드
              개발자로 다양한 프로젝트에 참여하며 웹과 모바일 환경에서 뛰어난
              사용자 경험을 제공하는 데 집중해왔습니다. 웹 개발로 시작해 점차
              웹뷰과 네이티브 앱 개발까지 범위를 확장하며, 각 단계에서 발생한
              기술적 도전을 해결했습니다. 특히 지난 1년 반 동안 모든 클라이언트
              부분을 혼자서 개발, 운영해왔고, 그 과정에서 발생하는 문제들을
              빠르게 파악하고 해결해왔습니다. 창의적으로 해결책을 찾아내는 데
              자신이 있으며, 새로운 기술을 배우고 발전하는 데 열정을 가지고
              있습니다. 다양한 사용자 요구를 반영하여, 효율적이고 직관적인
              UI/UX를 구현하는 데 강점을 가지고 있습니다.
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>KAIST 전산학부 학사</div>
                <div>2017.3 - 2022.2</div>
              </div>
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Orwell Health</div>
                <div>2022.4 - 2024.12</div>
              </div>
            </div>
          </div>
        </div>
        <div css={{ flex: 1, padding: "40px" }}>
          <Button buttonText="Inside" onClick={goInside} />
          <Button buttonText="Anxy" onClick={goAnxy} />
          <Button buttonText="Distancing" onClick={goDistancing} />
          <div css={{ marginTop: "20px" }}>
            <Button buttonText="MVP" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
