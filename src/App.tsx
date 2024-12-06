import { BrowserRouter } from "react-router";
import ServiceRouter from "./routes/ServiceRouter";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles /> <ServiceRouter />
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;
