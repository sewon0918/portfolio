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
      },
    },
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ServiceRouter />
        </BrowserRouter>
        <GlobalStyles />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
