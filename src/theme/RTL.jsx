import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IRANSansXFaNum",
  },
});

export default function RTL(props) {
  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager stylisPlugins={[rtlPlugin]}>
        {props.children}
      </StyleSheetManager>
    </ThemeProvider>
  );
}
