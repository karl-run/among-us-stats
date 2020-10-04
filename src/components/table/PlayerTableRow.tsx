import { useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

import { Player, Session, statsSlice } from '../../store/statsRedux';

import PlayerAvatar from './PlayerAvatar';

interface Props {
  player: Player;
  session: Session;
}

function PlayerTableRow({ player, session }: Props): JSX.Element {
  const dispatch = useDispatch();

  return (
    <TableRow key={player.name}>
      <TableCell component="th" scope="row" padding="none">
        <ListItem>
          <PlayerAvatar player={player} />
          <ListItemText
            primary={player.name.slice(0, 25) + (player.name.length > 25 ? '...' : '')}
            secondary={`${Math.round(player.impostorRate * 100)}% impostor`}
          />
        </ListItem>
      </TableCell>
      {session.games.map((game) => {
        return (
          <TableCell key={game.gameId} align="center">
            <Tooltip title="Set impostor status in game">
              <Checkbox
                checked={game.impostors.includes(player.name)}
                onChange={() => {
                  dispatch(
                    statsSlice.actions.toggleImpostor({
                      gameId: game.gameId,
                      player: player.name,
                    }),
                  );
                }}
                color="secondary"
              />
            </Tooltip>
          </TableCell>
        );
      })}
      <TableCell />
    </TableRow>
  );
}

export default PlayerTableRow;
