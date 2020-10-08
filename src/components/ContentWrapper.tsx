import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';

import LinkTab from './shared/LinkTabs';

interface Props {
  children: JSX.Element;
}

const paths = ['/', '/sessions'];

function ContentWrapper({ children }: Props): JSX.Element {
  const { pathname } = useLocation();

  return (
    <Container maxWidth="xl">
      <Box pt={2} />
      <Tabs variant="fullWidth" value={paths.indexOf(pathname)} aria-label="nav tabs example">
        <LinkTab label="Current" to="/" />
        <LinkTab label="Previous" to="/sessions" />
      </Tabs>
      {children}
    </Container>
  );
}

export default ContentWrapper;
