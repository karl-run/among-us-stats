import React from 'react';
import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import store, { persistor } from '../store/redux';

import Stats from './Stats';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <CssBaseline />
            <Stats />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
