import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

import { commonSlice, hasVisitedSettingsKey } from '../../store/common/commonRedux';
import { RootState } from '../../store/redux';

export function KebabMenu(): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Small hack to force this menu to re-render so that the dot disappears whe first time someone opens settings
  useSelector((state: RootState) => state.common.showSettings);

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
          <Badge
            variant="dot"
            color="secondary"
            invisible={typeof window !== 'undefined' ? !!localStorage.getItem(hasVisitedSettingsKey) : false}
          >
            <MoreVertIcon />
          </Badge>
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
      >
        <MenuItem
          onClick={() => {
            dispatch(commonSlice.actions.toggleShowHelp());
            handleClose();
          }}
        >
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(commonSlice.actions.toggleFeedback());
            handleClose();
          }}
        >
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText>Feedback / Report a bug</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(commonSlice.actions.toggleSettings());
            handleClose();
          }}
        >
          <ListItemIcon>
            <Badge
              variant="dot"
              color="secondary"
              invisible={typeof window !== 'undefined' ? !!localStorage.getItem(hasVisitedSettingsKey) : false}
            >
              <SettingsIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText>Configure Discord Integration</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
