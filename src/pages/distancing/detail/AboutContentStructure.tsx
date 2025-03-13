import ProjectDetailTemplate from "../../template/ProjectDetailTemplate";

export default function AboutContentStructure() {
  return (
    <ProjectDetailTemplate
      srcList={[
        "assets/distancing/blocks/example1.webp",
        "assets/distancing/blocks/example2.webp",
        "assets/distancing/blocks/example3.webp",
      ]}
      description={{
        배경: [
          "활동지는 Block 단위로 이루어져 있고, 각 블록에는 Textarea, Image, 그래프 등 다양한 컴포넌트가 포함될 수 있습니다.",
          "활동지 내부의 각 줄에는 하나 이상의 컴포넌트가 포함될 수 있습니다.",
          "활동지는 추가 및 확장이 자유로워야 합니다.",
        ],
        "세부 설계": [
          "활동지의 유연한 추가 및 확장을 위해 컴포넌트의 스키마와 초기 데이터를 프론트엔드에서 관리했습니다. ",
          "Block > Line > Cell 구조를 통해, Block은 Line[] 구조로, Line은 Cell[] 구조로 구성될 수 있도록 하여 데이터의 계층적 관계를 명확히 정의했습니다.  ",
          "모든 Cell 컴포넌트는 공통 기본 인터페이스(IBaseCell)를 상속받도록 설계했습니다. 이 인터페이스는 id, type 등 모든 Cell이 공유해야 하는 최소한의 속성을 정의하고, 각 Cell 타입(TextCell, ImageCell, GraphCell 등)은 이 기본 인터페이스를 확장하여 자신만의 고유한 속성과 동작을 추가할 수 있도록 했습니다.",
          "이러한 타입 확장 방식을 통해 공통 로직 처리는 통일성을 유지하면서도 각 Cell 컴포넌트가 독립적으로 동작하도록 하여 확장성과 유지보수성을 확보했습니다.",
        ],
        "트러블 슈팅 및 성능 개선": [
          "Cell 컴포넌트에서 이전 활동지의 내용을 가져와야 하는 경우가 있었고, 초기 설계에서 동일한 활동지를 참조하는 Cell 컴포넌트가 각기 별도로 데이터를 요청하면서 중복 호출이 발생했습니다.",
          "이러한 문제를 해결하기 위해 React-query를 도입해 데이터 요청을 캐싱하고 중복 호출을 방지했고, 성능을 개선할 수 있었습니다. ",
        ],
      }}
    ></ProjectDetailTemplate>
  );
}
