import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Sort from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sortBy, reverse } from 'rambda';

import useAnchor from '../shared/hooks/useAnchor';
import { RootState } from '../../store/redux';
import { commonSlice, SortPlayersBy } from '../../store/common/commonRedux';
import BreakpointButton from '../shared/BreakpointButton';

import PlayerOverviewRow from './PlayerOverviewRow';
import usePlayersWithTotalStats from './usePlayerWithTotalStats';

const sortOptions: SortPlayersBy[] = [
  'Games played',
  'Total win rate',
  'Crew win rate',
  'Impostor win rate',
  'Impostor rate',
];

function PlayersOverview(): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, anchorActions] = useAnchor();
  const sortPlayersBy = useSelector((state: RootState) => state.common.sortPlayersBy);
  const [playersWithTotalStats, metaStats] = usePlayersWithTotalStats();

  const playersWithTotalStatsSorted = reverse(
    sortBy((player) => {
      switch (sortPlayersBy) {
        case 'Games played':
          return player.gamesPlayed;
        case 'Total win rate':
          return player.totalWinRate;
        case 'Impostor win rate':
          return player.totalImpostorWinRate;
        case 'Crew win rate':
          return player.totalCrewWinRate;
        case 'Impostor rate':
          return player.totalImpostorRate;
      }
    })(playersWithTotalStats),
  );

  return (
    <Paper>
      <Toolbar>
        <Typography variant="h5">Total player stats</Typography>
        <Box flex="1 1 auto" />
        <BreakpointButton
          text={`Sort by: ${sortPlayersBy}`}
          label={`Sort by: ${sortPlayersBy}`}
          onClick={anchorActions.handleClick}
          endIcon={<Sort />}
        />
        <Menu
          id="sort-by-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={anchorActions.handleClose}
        >
          {sortOptions.map((it) => (
            <MenuItem
              key={it}
              onClick={() => {
                dispatch(commonSlice.actions.sortPlayerBy(it));
                anchorActions.handleClose();
              }}
            >
              {it}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
      <Box p={3} pt={0}>
        <Box pb={2}>
          <Typography variant="body1">
            A total of{' '}
            <Box component="span" fontWeight="bold">
              {metaStats.totalPlayers} players
            </Box>{' '}
            have played{' '}
            <Box component="span" fontWeight="bold">
              {metaStats.totalGames} games
            </Box>{' '}
            over{' '}
            <Box component="span" fontWeight="bold">
              {metaStats.totalSessions} sessions
            </Box>
            .
          </Typography>
        </Box>
        <Grid container spacing={1}>
          {playersWithTotalStatsSorted.map((it, index) => (
            <Fragment key={it.playerId}>
              <Grid item xs={12}>
                <PlayerOverviewRow player={it} />
              </Grid>
              {index !== playersWithTotalStats.length - 1 && (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              )}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default PlayersOverview;
