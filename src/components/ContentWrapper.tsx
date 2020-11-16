import React, { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

import { getPlayers } from '../store/stats/statsSelectors';

import LinkTab from './shared/LinkTabs';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

const paths = [['/', '/summary'], '/sessions', '/players'];

const getIndex = (path: string): number =>
  paths.findIndex((it) => (typeof it === 'string' ? it === path : it.includes(path)));

function ContentWrapper({ children }: Props): JSX.Element {
  const hasPlayers = useSelector(getPlayers).length > 0;
  const router = useRouter();
  const { pathname } = router;

  return (
    <Container maxWidth="xl">
      <Box pt={2} />
      <Tabs variant="fullWidth" value={getIndex(pathname)} aria-label="nav tabs example">
        <LinkTab label="Current" to="/" />
        <LinkTab label="Previous" to="/sessions" />
        {hasPlayers && <LinkTab label="Players" to="/players" />}
      </Tabs>
      {children}
    </Container>
  );
}

export default ContentWrapper;
