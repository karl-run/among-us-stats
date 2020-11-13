import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Hidden from '@material-ui/core/Hidden';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { statsSlice } from '../../store/stats/statsRedux';
import crew from '../../images/crew.png';
import { commonSlice } from '../../store/common/commonRedux';
import BreakpointButton from '../shared/BreakpointButton';

import FeedbackButton from './FeedbackButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
    filter: 'hue-rotate(180deg)',
    animation: '$hue-animation 15s linear infinite',
  },
  '@keyframes hue-animation': {
    '0%': { filter: 'hue-rotate(180deg)' },
    '100%': { filter: 'hue-rotate(-180deg)' },
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBar(): JSX.Element {
  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Link to="/">
          <Avatar src={crew} className={classes.logo} />
        </Link>
        <Hidden smDown>
          <Typography variant="h6" className={classes.title}>
            Among Us Stats Tracker
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography variant="h6" className={classes.title}>
            AUST
          </Typography>
        </Hidden>
        <BreakpointButton
          text="New session"
          endIcon={<AddCircleOutlineIcon />}
          label="Start a new session"
          onClick={() => {
            dispatch(statsSlice.actions.newSession());
          }}
        />
        <FeedbackButton />
        <BreakpointButton
          text="Help"
          endIcon={<HelpOutlineIcon />}
          label="Open help dialog"
          onClick={() => {
            dispatch(commonSlice.actions.toggleShowHelp());
          }}
        />
        <KebabMenu />
      </Toolbar>
    </MuiAppBar>
  );
}

function KebabMenu(): JSX.Element {
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

export default AppBar;
