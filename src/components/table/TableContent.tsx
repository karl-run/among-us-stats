import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { Session } from '../../store/statsRedux';

import CompleteGameButton from './CompleteGameButton';
import NewPlayerButton from './NewPlayerButton';
import PlayerTableRow from './PlayerTableRow';

const useStyles = makeStyles({
  playerCell: {
    minWidth: '250px',
  },
  gameCell: {
    minWidth: '100px',
  },
});

interface Props {
  session: Session;
}

function TableContent({ session }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.playerCell} width="20%" align="center">
              Player
            </TableCell>
            {session.games.map((game, index) => (
              <TableCell className={classes.gameCell} key={index} width="150px" align="center">
                <Typography variant={index === 0 ? 'body1' : 'body2'}>
                  <Box fontWeight={index === 0 ? 'fontWeightBold' : 'fontWeightNormal'}>
                    Game {session.games.length - index}
                  </Box>
                </Typography>
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {session.players.map((player) => (
            <PlayerTableRow key={player.name} player={player} session={session} />
          ))}
          <TableRow>
            <TableCell align="center">
              <NewPlayerButton noPlayers={session.players.length === 0} />
            </TableCell>
            {session.games.map((game) => (
              <CompleteGameButton key={game.gameId} game={game} />
            ))}
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableContent;
