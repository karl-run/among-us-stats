import { useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import { Avatar, ButtonBaseActions, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import crew from '../../../images/crew.png';
import impostor from '../../../images/impostor.png';
import { Game, statsSlice } from '../../../store/stats/statsRedux';

interface Props {
  game: Game;
  focusAndWarn: boolean;
}

function CompleteGameButton({ game, focusAndWarn }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [show, set] = useState(false);
  const ref = useRef<ButtonBaseActions | null>(null);

  useEffect(() => {
    if (focusAndWarn) {
      ref.current?.focusVisible();
    }
  }, [focusAndWarn]);

  return (
    <>
      <TableCell align="center">
        <Tooltip title={!focusAndWarn ? 'Set winner' : 'Remember to complete this game!'}>
          <IconButton
            action={focusAndWarn ? ref : undefined}
            aria-label="add new game"
            onClick={() => set(true)}
            autoFocus={focusAndWarn}
            color={focusAndWarn ? 'secondary' : 'default'}
          >
            {game.winner === 'impostor' && <Avatar src={impostor} />}
            {game.winner === 'crew' && <Avatar src={crew} />}
            {game.winner === null && <DoneIcon />}
          </IconButton>
        </Tooltip>
      </TableCell>
      {show && (
        <Dialog open onClose={() => set(false)} aria-labelledby="who won game dialog">
          <DialogTitle id="simple-dialog-title">Who won?</DialogTitle>
          <List>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: 'impostor',
                  }),
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar src={impostor} />
              </ListItemAvatar>
              <ListItemText primary="Impostor" />
            </ListItem>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: 'crew',
                  }),
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar src={crew} />
              </ListItemAvatar>
              <ListItemText primary="Crewmates" />
            </ListItem>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: null,
                  }),
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar>?</Avatar>
              </ListItemAvatar>
              <ListItemText primary="No one" />
            </ListItem>
          </List>
        </Dialog>
      )}
    </>
  );
}

export default CompleteGameButton;
