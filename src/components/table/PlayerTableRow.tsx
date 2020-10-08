import React from 'react';
import { useDispatch } from 'react-redux';
import AfkIcon from '@material-ui/icons/Hotel';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';

import { textOverflow } from '../../utils/stringUtils';
import { Player, Session, statsSlice } from '../../store/statsRedux';
import ImpostorIcon from '../shared/ImpostorIcon';
import { percentIt } from '../../utils/mathUtils';

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
            primary={textOverflow(player.name) + (player.isAfk ? ' (AFK)' : '')}
            secondary={`${percentIt(player.impostorRate)} impostor`}
          />
        </ListItem>
      </TableCell>
      {session.games.map((game) => {
        const playerIsImpostor = game.impostors.includes(player.name);
        const playerInGame = game.players.includes(player.name);
        const tooltip = playerIsImpostor
          ? `${player.name} was impostor this game`
          : playerInGame
          ? `${player.name} was crew this game`
          : `${player.name} did not participate in this game`;

        return (
          <TableCell key={game.gameId} align="center">
            <Tooltip title={tooltip}>
              <Checkbox
                checkedIcon={<ImpostorIcon />}
                indeterminateIcon={<AfkIcon style={{ opacity: 0.7 }} />}
                checked={playerIsImpostor}
                indeterminate={!playerInGame}
                onChange={() => {
                  if (playerIsImpostor) {
                    dispatch(statsSlice.actions.removePlayerFromGame({ gameId: game.gameId, player: player.name }));
                    return;
                  } else if (!playerInGame) {
                    dispatch(statsSlice.actions.addPlayerToGame({ gameId: game.gameId, player: player.name }));
                    return;
                  }
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
