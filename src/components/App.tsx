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
import SettingsDialog from './SettingsDialog';
import NotFound from './NotFound';
import Analytics from './Analytics';
import { theme } from './theme';
import ContentWrapper from './ContentWrapper';
import PlayersOverview from './playersoverview/PlayersOverview';
import ErrorBoundary from './ErrorBoundary';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Router>
              <IntroDialog />
              <SettingsDialog />
              <Analytics />
              <CssBaseline />
              <AppBar />
              <ContentWrapper>
                <Switch>
                  <Route exact path={['/', '/summary']}>
                    <Stats />
                  </Route>
                  <Route path="/sessions">
                    <Sessions />
                  </Route>
                  <Route path="/players">
                    <PlayersOverview />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </ContentWrapper>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
