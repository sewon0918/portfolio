import { BrowserRouter } from "react-router";
import ServiceRouter from "./routes/ServiceRouter";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";

declare module "@emotion/react" {
  export interface Theme {
    anxy: {
      colors: {
        orange: string;
        oat: string;
        black: string;
        green: string;
      };
    };
  }
}

function App() {
  const theme = {
    anxy: {
      colors: {
        orange: "#D66418",
        oat: "#F1EEEB",
        black: "#26282C",
        green: "#2B773A",
      },
    },
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/portfolio/">
          <ServiceRouter />
        </BrowserRouter>
        <GlobalStyles />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
