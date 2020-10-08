import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store, { persistor } from '../store/redux';

import Stats from './Stats';
import AppBar from './AppBar';
import Sessions from './sessions/Sessions';
import IntroDialog from './IntroDialog';
import NotFound from './NotFound';
import Analytics from './Analytics';
import { theme } from './theme';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <IntroDialog />
            <Analytics />
            <CssBaseline />
            <AppBar />
            <Switch>
              <Route exact path="/">
                <Stats />
              </Route>
              <Route path="/sessions">
                <Sessions />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
