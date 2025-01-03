import { BrowserRouter } from "react-router";
import ServiceRouter from "./routes/ServiceRouter";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { CssVarsProvider } from "@mui/joy";
import { theme as joyuiTheme } from "./styles/theme";
import { useEffect } from "react";
import { preloadLottieFiles } from "./utils/preloadLottieFiles";

declare module "@emotion/react" {
  export interface Theme {
    anxy: {
      colors: { [key: string]: string };
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

  useEffect(() => {
    const files = preloadLottieFiles();
    console.log("Preloaded files:", files);
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssVarsProvider theme={joyuiTheme}>
          <BrowserRouter basename="/">
            <ServiceRouter />
          </BrowserRouter>
          <GlobalStyles />
        </CssVarsProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
