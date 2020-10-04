import React from 'react';
import { Box, Dialog, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GamepadIcon from '@material-ui/icons/Gamepad';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import WarningIcon from '@material-ui/icons/Warning';
import Paper from '@material-ui/core/Paper';

import { RootState } from '../../store/redux';
import Scoreboard from '../shared/Scoreboard';
import IconInfoText from '../shared/IconInfoText';

import PlayerStatItem from './PlayerStatsItem';
import Watermark from './Watermark';

interface Props {
  close: () => void;
}

function Summary({ close }: Props): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const session = useSelector((state: RootState) => state.stats.session);

  const playersByWinRate = [...session.players].sort((a, b) => b.winRates.total - a.winRates.total);
  const unfinishedGames = session.games.filter((it) => it.winner == null).length;

  return (
    <Dialog
      onClose={close}
      aria-labelledby="simple-dialog-title"
      open
      fullWidth
      maxWidth="sm"
      fullScreen={isSmallDevice}
    >
      <Box pt={1} pl={2} display="flex" alignItems="center">
        <GamepadIcon style={{ marginRight: theme.spacing(1) }} />
        <Typography variant="h6">Summary</Typography>
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
      <Watermark />
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Summary;
