import React from "react";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import store, { persistor } from "./redux";
import StatSession from "./StatSession";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Container>
            <CssBaseline />
            <StatSession />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
