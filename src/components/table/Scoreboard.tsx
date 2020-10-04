import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import { makeStyles } from '@material-ui/core/styles';

import impostor from '../../images/impostor.png';
import crew from '../../images/crew.png';

interface Props {
  score: [impostorScore: number, crewScore: number];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '350px',
  },
  scoreBox: {
    display: 'flex',
    alignItems: 'center',
  },
  numberBox: {
    padding: theme.spacing(1),
  },
}));

function Scoreboard({ score: [impostorScore, crewScore] }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.scoreBox} alignSelf="flex-start">
        <Typography variant="h5">Impostors</Typography>
        <Box m={1}>
          <Avatar src={impostor} />
        </Box>
      </Box>
      <Box>
        <Box className={classes.numberBox}>
          <Typography variant="h4">{impostorScore}</Typography>
        </Box>
        <Box className={classes.numberBox}>
          <Typography variant="h4">{crewScore}</Typography>
        </Box>
      </Box>
      <Box className={classes.scoreBox} alignSelf="flex-end">
        <Box m={1}>
          <Avatar src={crew} />
        </Box>
        <Typography variant="h5">Crewmates</Typography>
      </Box>
    </Box>
  );
}

export default Scoreboard;
