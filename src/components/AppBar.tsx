import React from 'react';
import { useDispatch } from 'react-redux';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HistoryIcon from '@material-ui/icons/History';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

import { statsSlice } from '../store/statsRedux';
import crew from '../images/crew.png';

import BreakpointButton, { BreakpointLinkButton } from './shared/BreakpointButton';

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
        <BreakpointLinkButton
          text="Previous sessions"
          endIcon={<HistoryIcon />}
          label="View previous sessions"
          to="/sessions"
        />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;