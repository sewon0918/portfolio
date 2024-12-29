import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div css={{ fontWeight: 600, textAlign: "center" }} onClick={goHome}>
      PORTFOLIO
    </div>
  );
}
