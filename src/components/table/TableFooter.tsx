import React from 'react';
import Box from '@material-ui/core/Box';

import { Session } from '../../store/statsRedux';
import Scoreboard from '../shared/Scoreboard';

interface Props {
  session: Session;
}

function TableFooter({ session }: Props): JSX.Element {
  return (
    <Box p={2} display="flex" justifyContent="center">
      <Scoreboard session={session} />
    </Box>
  );
}

export default TableFooter;
