import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux";

import StatSession from "./StatSession";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <CssBaseline />
          <StatSession />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
