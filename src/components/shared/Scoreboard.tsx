import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import { Session } from '../../store/stats/statsRedux';
import impostor from '../../images/impostor.png';
import crew from '../../images/crew.png';

interface Props {
  session: Session;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '350px',
    justifyContent: 'center',
  },
  scoreBox: {
    display: 'flex',
    alignItems: 'center',
  },
  numberBox: {
    padding: theme.spacing(1),
  },
  impostorIcon: {
    transform: 'rotateY(180deg)',
  },
}));

function Scoreboard({ session }: Props): JSX.Element {
  const classes = useStyles();
  const impostorWinCount = session.games.map((it) => it.winner).filter((it) => it === 'impostor').length;
  const crewWinCount = session.games.map((it) => it.winner).filter((it) => it === 'crew').length;

  return (
    <Box className={classes.root}>
      <Box className={classes.scoreBox} alignSelf="flex-start">
        <Hidden xsDown>
          <Typography variant="h5">Impostors</Typography>
        </Hidden>
        <Box m={1}>
          <Avatar src={impostor} className={classes.impostorIcon} />
        </Box>
      </Box>
      <Box>
        <Box className={classes.numberBox}>
          <Typography variant="h4">{impostorWinCount}</Typography>
        </Box>
        <Box className={classes.numberBox}>
          <Typography variant="h4">{crewWinCount}</Typography>
        </Box>
      </Box>
      <Box className={classes.scoreBox} alignSelf="flex-end">
        <Box m={1}>
          <Avatar src={crew} />
        </Box>
        <Hidden xsDown>
          <Typography variant="h5">Crewmates</Typography>
        </Hidden>
      </Box>
    </Box>
  );
}

export default Scoreboard;
