import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';

import { EnhancedPlayer, Session } from '../../../store/stats/statsRedux';

import CompleteGameButton from './CompleteGameButton';
import NewPlayerButton from './addplayer/NewPlayerButton';
import PlayerTableRow from './PlayerTableRow';
import TableHeaderCell from './TableHeaderCell';

const useStyles = makeStyles({
  playerCell: {
    minWidth: '250px',
  },
});

interface Props {
  session: Session<EnhancedPlayer>;
}

function TableContent({ session }: Props): JSX.Element {
  const classes = useStyles();

  const indexOfFocusAndWarnGame = indexOfGameToComplete(session);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.playerCell} width="20%" align="center">
              {session.players.length || 'No'} players
            </TableCell>
            {session.games.map((game, index) => (
              <TableHeaderCell
                key={game.gameId}
                gameId={game.gameId}
                gameNumber={session.games.length - index}
                isCurrentGame={index === 0}
              />
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {session.players.map((player) => (
            <PlayerTableRow key={player.playerId} player={player} session={session} />
          ))}
          <TableRow>
            <TableCell align="center">
              <NewPlayerButton session={session} noPlayers={session.players.length === 0} />
            </TableCell>
            {session.games.map((game, index) => (
              <CompleteGameButton key={game.gameId} game={game} focusAndWarn={index === indexOfFocusAndWarnGame} />
            ))}
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function indexOfGameToComplete(session: Session) {
  const incompleteGames = session.games.filter((it) => it.winner == null).length;
  if (incompleteGames > 1) {
    return session.games.length - 1 - [...session.games].reverse().findIndex((it) => it.winner == null);
  }

  return -1;
}

export default TableContent;
