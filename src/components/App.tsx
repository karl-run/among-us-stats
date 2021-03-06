import React, { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store, { persistor } from '../store/redux';

import AppBar from './appbar/AppBar';
import ActiveSession from './activesession/ActiveSession';
import Sessions from './sessions/Sessions';
import IntroDialog from './dialogs/IntroDialog';
import SettingsDialog from './dialogs/SettingsDialog';
import FeedbackDialog from './dialogs/FeedbackDialog';
import NotFound from './NotFound';
import Analytics from './Analytics';
import { theme } from './theme';
import ContentWrapper from './ContentWrapper';
import ErrorBoundary from './ErrorBoundary';
import FullscreenFallback from './shared/FullscreenFallback';

const LazyPlayersOverview = React.lazy(() => import('./playersoverview/PlayersOverview'));

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Router>
              <IntroDialog />
              <SettingsDialog />
              <FeedbackDialog />
              <Analytics />
              <CssBaseline />
              <AppBar />
              <ContentWrapper>
                <Switch>
                  <Route exact path={['/', '/summary']}>
                    <ActiveSession />
                  </Route>
                  <Route path="/sessions">
                    <Sessions />
                  </Route>
                  <Route path="/players">
                    <Suspense fallback={<FullscreenFallback />}>
                      <LazyPlayersOverview />
                    </Suspense>
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
