import { useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

import { textOverflow } from '../../utils/stringUtils';
import { Player, Session, statsSlice } from '../../store/statsRedux';
import ImpostorIcon from '../shared/ImpostorIcon';

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
            primary={textOverflow(player.name)}
            secondary={`${Math.round(player.impostorRate * 100)}% impostor`}
          />
        </ListItem>
      </TableCell>
      {session.games.map((game) => {
        return (
          <TableCell key={game.gameId} align="center">
            <Tooltip title="Set impostor status in game">
              <Checkbox
                checkedIcon={<ImpostorIcon />}
                checked={game.impostors.includes(player.name)}
                onChange={() => {
                  dispatch(
                    statsSlice.actions.toggleImpostor({
                      gameId: game.gameId,
                      player: player.name,
                    }),
                  );
                }}
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
