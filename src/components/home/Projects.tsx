import { useNavigate } from "react-router";
import Button from "@/components/common/Button";

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
      <Button buttonText="Distancing" onClick={goDistancing} />

      {/* <div css={{ marginTop: "20px" }}> */}
      <Button buttonText="Endless Trials" onClick={goOthers} />
      {/* </div> */}
      <Button buttonText="Anxy" onClick={goAnxy} />
      <Button buttonText="Inside" onClick={goInside} />
    </div>
  );
}
