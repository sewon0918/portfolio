import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/test");
  };

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: "blue", width: "100vw", height: "100vh" }}
    ></div>
  );
}

export default App;
