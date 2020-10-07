import React from 'react';
import GamepadIcon from '@material-ui/icons/Gamepad';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

import { Session } from '../../store/statsRedux';

import PlayerStatItem from './PlayerStatsItem';
import IconInfoText from './IconInfoText';
import Scoreboard from './Scoreboard';
import EditableTitle from './EditableTitle';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    position: 'relative',
  },
  gamepadIcon: {
    marginRight: theme.spacing(1),
  },
  autoPad: {
    flex: '1 1 auto',
  },
  optionalActions: {
    marginRight: theme.spacing(2),
    '& > button': {
      marginLeft: theme.spacing(2),
    },
  },
  gamesPlayed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));

interface Props {
  session: Session;
  extraActions?: JSX.Element | JSX.Element[];
}

function SummaryCard({ session, extraActions }: Props): JSX.Element {
  const classes = useStyles();
  const playersByWinRate = [...session.players].sort((a, b) => b.winRates.total - a.winRates.total);
  const unfinishedGames = session.games.filter((it) => it.winner == null).length;

  return (
    <Box className={classes.rootBox}>
      <Box pt={1} pl={2} display="flex" alignItems="center">
        <GamepadIcon className={classes.gamepadIcon} />
        <EditableTitle session={session} />
        <Box className={classes.autoPad} />
        <Box className={classes.optionalActions}>{extraActions}</Box>
      </Box>
      {unfinishedGames > 0 && (
        <Box m={2}>
          <Paper elevation={6} variant="outlined">
            <Box>
              <IconInfoText
                text={`There are ${unfinishedGames} unfinished games. Statistics will be incomplete.`}
                icon={<WarningIcon />}
                opacity={1}
              />
            </Box>
          </Paper>
        </Box>
      )}
      <Box m={1}>
        <Grid container spacing={1}>
          {playersByWinRate.map((it, index) => (
            <PlayerStatItem key={it.name} player={it} placement={index + 1} />
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" pb={1}>
        <Scoreboard session={session} />
      </Box>
      <Box m={2} className={classes.gamesPlayed}>
        <Typography variant="subtitle2">{session.games.length} games played</Typography>
      </Box>
    </Box>
  );
}

export default SummaryCard;
