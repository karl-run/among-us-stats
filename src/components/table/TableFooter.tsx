import React from 'react';
import Box from '@material-ui/core/Box';

import { Session } from '../../store/statsRedux';

import Scoreboard from './Scoreboard';

interface Props {
  session: Session;
}

function TableFooter({ session }: Props): JSX.Element {
  const impostorWinCount = session.games.map((it) => it.winner).filter((it) => it === 'impostor').length;
  const crewWinCount = session.games.map((it) => it.winner).filter((it) => it === 'crew').length;

  return (
    <Box p={2} display="flex" justifyContent="center">
      <Scoreboard score={[impostorWinCount, crewWinCount]} />
    </Box>
  );
}

export default TableFooter;
