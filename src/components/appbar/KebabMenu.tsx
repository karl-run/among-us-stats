import { useDispatch } from 'react-redux';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { commonSlice } from '../../store/common/commonRedux';

export function KebabMenu(): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Settings">
        <IconButton aria-label="Settings" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="overflow-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock
      >
        <MenuItem
          onClick={() => {
            dispatch(commonSlice.actions.toggleSettings());
            handleClose();
          }}
        >
          Configure Discord Integration
        </MenuItem>
      </Menu>
    </>
  );
}
