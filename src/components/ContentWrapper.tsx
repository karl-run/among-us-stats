import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';

import LinkTab from './shared/LinkTabs';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  children: JSX.Element;
}

const paths = [['/', '/summary'], '/sessions'];

const getIndex = (path: string): number =>
  paths.findIndex((it) => (typeof it === 'string' ? it === path : it.includes(path)));

function ContentWrapper({ children }: Props): JSX.Element {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary>
      <Container maxWidth="xl">
        <Box pt={2} />
        <Tabs variant="fullWidth" value={getIndex(pathname)} aria-label="nav tabs example">
          <LinkTab label="Current" to="/" />
          <LinkTab label="Previous" to="/sessions" />
        </Tabs>
        {children}
      </Container>
    </ErrorBoundary>
  );
}

export default ContentWrapper;
