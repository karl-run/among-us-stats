import React, { useRef } from 'react';
import GamepadIcon from '@material-ui/icons/Gamepad';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector } from 'react-redux';

import { EnhancedPlayer, Session } from '../../store/stats/statsRedux';
import { formatDistanceToNow, parseIso } from '../../utils/dateUtils';
import { RootState } from '../../store/redux';

import PlayerStatsItem from './PlayerStatsItem';
import IconInfoText from './IconInfoText';
import Scoreboard from './Scoreboard';
import EditableTitle from './EditableTitle';
import DiscordShareButton from './DiscordShareButton';

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
  timestamp: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
}));

interface Props {
  session: Session<EnhancedPlayer>;
  extraActions?: JSX.Element | JSX.Element[];
  noTimestamp?: boolean;
}

function SummaryCard({ session, extraActions, noTimestamp = false }: Props): JSX.Element {
  const classes = useStyles();
  const summaryCardRef = useRef<HTMLDivElement>(null);
  const settings = useSelector((state: RootState) => state.settings);

  const playersByWinRate = [...session.players].sort((a, b) => b.winRates.total - a.winRates.total);
  const unfinishedGames = session.games.filter((it) => it.winner == null).length;

  return (
    <div>
      <div ref={summaryCardRef}>
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
                <PlayerStatsItem key={it.playerId} player={it} placement={index + 1} />
              ))}
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" pb={4}>
            <Scoreboard session={session} />
          </Box>
          <Box m={2} className={classes.gamesPlayed}>
            <Typography variant="subtitle2">{session.games.length} games played</Typography>
          </Box>
          {!noTimestamp && (
            <Box m={2} className={classes.timestamp}>
              <Tooltip interactive title={session.lastGamePlayed}>
                <Typography variant="subtitle2">{formatDistanceToNow(parseIso(session.lastGamePlayed))} ago</Typography>
              </Tooltip>
            </Box>
          )}
        </Box>
      </div>
      {settings.discordShareWebhook && !extraActions && <DiscordShareButton shareBoxRef={summaryCardRef} />}
    </div>
  );
}

export default SummaryCard;
