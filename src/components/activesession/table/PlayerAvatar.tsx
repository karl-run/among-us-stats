import { useDispatch } from 'react-redux';
import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Avatar, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { EnhancedPlayer, statsSlice } from '../../../store/stats/statsRedux';
import useAnchor from '../../shared/hooks/useAnchor';

import RemovePlayerMenuItem from './RemovePlayerMenuItem';

interface Props {
  player: EnhancedPlayer;
}

function PlayerAvatar({ player }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, anchorActions] = useAnchor();

  return (
    <>
      <ListItemAvatar style={{ opacity: player.isAfk ? 0.3 : 1 }}>
        <IconButton aria-controls="player-menu" aria-haspopup="true" onClick={anchorActions.handleClick}>
          <Avatar>{player.name.slice(0, 2).toUpperCase()}</Avatar>
        </IconButton>
      </ListItemAvatar>
      <Menu
        id="player-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={anchorActions.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(statsSlice.actions.toggleAfk({ playerId: player.playerId }));
            anchorActions.handleClose();
          }}
        >
          {player.isAfk ? 'Set not AFK' : 'Set AFK'}
        </MenuItem>
        <RemovePlayerMenuItem player={player} close={anchorActions.handleClose} />
      </Menu>
    </>
  );
}

export default PlayerAvatar;
