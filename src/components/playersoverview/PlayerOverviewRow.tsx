import Grid from '@material-ui/core/Grid';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { makeStyles } from '@material-ui/core/styles';

import crew from '../../images/crew.png';
import impostor from '../../images/impostor.png';
import { percentIt } from '../../utils/mathUtils';
import ImpostorIcon from '../shared/icons/ImpostorIcon';

import { PlayerStats } from './usePlayerWithTotalStats';

const useStyles = makeStyles((theme) => ({
  winnerIcon: {
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
  },
  impostorRateAvatar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  player: PlayerStats;
}

function PlayerOverviewRow({ player }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item md="auto" sm={12} xs={12}>
        <Box display="flex" alignItems="center">
          <Box p={1}>
            <Avatar>{player.name.slice(0, 2).toUpperCase()}</Avatar>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">{player.name}</Typography>
            <Typography variant="caption">{player.gamesPlayed} games played</Typography>
          </Box>
        </Box>
      </Grid>
      <StatItem
        icon={
          <Avatar className={classes.winnerIcon}>
            <InsertEmoticonIcon fontSize="large" />
          </Avatar>
        }
        title="Total win rate"
        text={percentIt(player.totalWinRate)}
      />
      <StatItem
        icon={<Avatar src={impostor} />}
        title="Impostor win rate"
        text={percentIt(player.totalImpostorWinRate)}
      />
      <StatItem icon={<Avatar src={crew} />} title="Crew win rate" text={percentIt(player.totalCrewWinRate)} />
      <StatItem
        icon={
          <Avatar className={classes.impostorRateAvatar}>
            <ImpostorIcon color="secondary" fontSize="large" />
          </Avatar>
        }
        title="Games as impostor"
        text={percentIt(player.totalImpostorRate)}
      />
    </Grid>
  );
}

interface StatItemProps {
  icon: JSX.Element;
  title: string;
  text: string;
}

function StatItem({ icon, title, text }: StatItemProps) {
  return (
    <Grid item md="auto" sm={6} xs={12}>
      <Box display="flex" alignItems="center">
        <Box p={1}>{icon}</Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="body1">{text}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default PlayerOverviewRow;
