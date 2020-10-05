import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar, Box, Typography } from '@material-ui/core';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import impostor from '../../images/impostor.png';
import crew from '../../images/crew.png';
import { Player } from '../../store/statsRedux';
import { textOverflow } from '../../utils/stringUtils';
import { percentIt } from '../../utils/mathUtils';

import InlineAvatar from './InlineAvatar';

const useStyles = makeStyles({
  subtitle: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function PlayerStatItem({ player, placement }: { player: Player; placement: number }): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={6}>
      <Grid item xs={2}>
        <Box height="100%" display="flex" justifyContent="center" alignItems="center" mr={1}>
          <Avatar>{ordinalSuffix(placement)}</Avatar>
        </Box>
      </Grid>
      <Grid container item xs={10}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            {textOverflow(player.name, 10)},{' '}
            <Box display="inline" fontWeight="bold">
              {percentIt(player.winRates.total)}
            </Box>{' '}
            of games won
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Tooltip title="Win rate as specific role">
            <Typography variant="subtitle2" className={classes.subtitle}>
              <InlineAvatar src={impostor} />
              {percentIt(player.winRates.impostor)}
              <InlineAvatar src={crew} />
              {percentIt(player.winRates.crew)}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Percent of rounds player was impostor">
            <Typography variant="caption">{percentIt(player.impostorRate)} impostor</Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box mt={0.5}>
          <Divider />
        </Box>
      </Grid>
    </Grid>
  );
}

function ordinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;

  if (j == 1 && k != 11) {
    return i + 'st';
  } else if (j == 2 && k != 12) {
    return i + 'nd';
  } else if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

export default PlayerStatItem;
