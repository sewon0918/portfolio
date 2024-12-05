import { useNavigate } from "react-router";

export default function Test() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/test");
  };
  return (
    <>
      <div
        onClick={onClick}
        style={{ backgroundColor: "red", width: "100%", height: "100%" }}
      ></div>
    </>
  );
}
