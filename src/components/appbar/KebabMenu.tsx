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
import useAnchor from '../shared/hooks/useAnchor';

export function KebabMenu(): JSX.Element {
  const dispatch = useDispatch();
  const [anchorEl, anchorActions] = useAnchor();

  // Small hack to force this menu to re-render so that the dot disappears whe first time someone opens settings
  useSelector((state: RootState) => state.common.showSettings);

  return (
    <>
      <Tooltip title="Settings">
        <IconButton aria-label="Settings" onClick={anchorActions.handleClick}>
          <Badge variant="dot" color="secondary" invisible={!!localStorage.getItem(hasVisitedSettingsKey)}>
            <MoreVertIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="overflow-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={anchorActions.handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem
          onClick={() => {
            dispatch(commonSlice.actions.toggleShowHelp());
            anchorActions.handleClose();
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
            anchorActions.handleClose();
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
            anchorActions.handleClose();
          }}
        >
          <ListItemIcon>
            <Badge variant="dot" color="secondary" invisible={!!localStorage.getItem(hasVisitedSettingsKey)}>
              <SettingsIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText>Configure Discord Integration</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
