import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { Avatar } from '@material-ui/core';
import { BadgeOrigin } from '@material-ui/core/Badge/Badge';

import impostor from '../../images/impostor.png';
import crew from '../../images/crew.png';
import { Session } from '../../store/statsRedux';

interface Props {
  session: Session;
}

function TableFooter({ session }: Props): JSX.Element {
  const impostorWinCount = session.games.map((it) => it.winner).filter((it) => it === 'impostor').length;
  const crewWinCount = session.games.map((it) => it.winner).filter((it) => it === 'crew').length;

  return (
    <Box p={2} display="flex">
      <Box pr={2}>
        <Tooltip title="Games won by impostors">
          <Badge badgeContent={impostorWinCount} color="secondary" overlap="circle" anchorOrigin={badgeAvatarAnchor}>
            <Avatar src={impostor} />
          </Badge>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Games won by crew">
          <Badge badgeContent={crewWinCount} color="secondary" overlap="circle" anchorOrigin={badgeAvatarAnchor}>
            <Avatar src={crew} />
          </Badge>
        </Tooltip>
      </Box>
    </Box>
  );
}

const badgeAvatarAnchor: BadgeOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

export default TableFooter;
