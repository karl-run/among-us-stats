import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../theme';
import store, { persistor } from '../store/redux';
import ErrorBoundary from '../components/ErrorBoundary';
import Analytics from '../components/Analytics';
import AppBar from '../components/appbar/AppBar';
import FeedbackDialog from '../components/dialogs/FeedbackDialog';
import SettingsDialog from '../components/dialogs/SettingsDialog';
import IntroDialog from '../components/dialogs/IntroDialog';
import ContentWrapper from '../components/ContentWrapper';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp(props): JSX.Element {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Analytics />
            <AppBar />
            <PersistGate loading={<div>Loading lol</div>} persistor={persistor}>
              <IntroDialog />
              <SettingsDialog />
              <FeedbackDialog />
              <ContentWrapper>
                <Component {...pageProps} />
              </ContentWrapper>
            </PersistGate>
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
