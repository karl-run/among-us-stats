import { useDispatch } from 'react-redux';
import React, { MouseEvent } from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Avatar, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Player, statsSlice } from '../../store/statsRedux';

function PlayerAvatar({ player }: { player: Player }): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemAvatar>
        <IconButton aria-controls="player-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar>{player.name.slice(0, 2).toUpperCase()}</Avatar>
        </IconButton>
      </ListItemAvatar>
      <Menu
        id="player-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
            dispatch(statsSlice.actions.removePlayer(player.name));
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </>
  );
}

export default PlayerAvatar;
