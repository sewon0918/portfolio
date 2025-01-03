import { useNavigate } from "react-router";
import ProjectTitle from "@/components/common/ProjectTitle";

export default function Projects() {
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
  const goOthers = () => {
    navigate("/project/others");
  };

  return (
    <div css={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <ProjectTitle title="Distancing" onClick={goDistancing} />
      <ProjectTitle title="Endless Trials" onClick={goOthers} />
      <ProjectTitle title="Anxy" onClick={goAnxy} />
      <ProjectTitle title="Inside" onClick={goInside} />
    </div>
  );
}
