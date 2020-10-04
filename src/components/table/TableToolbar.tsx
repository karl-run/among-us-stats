import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PlusOne';
import GamepadIcon from '@material-ui/icons/Gamepad';
import { useDispatch } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar/Avatar';

import crew from '../../images/crew.png';
import Summary from '../summary/Summary';
import { statsSlice } from '../../store/statsRedux';

const useStyles = makeStyles({
  leftMost: {
    flex: '1 1 100%',
  },
  logo: {
    filter: 'hue-rotate(180deg)',
    animation: '$hue-animation 15s linear infinite',
  },
  '@keyframes hue-animation': {
    '0%': { filter: 'hue-rotate(180deg)' },
    '100%': { filter: 'hue-rotate(-180deg)' },
  },
});

function TableToolbar(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [show, set] = useState(false);

  return (
    <>
      <Toolbar>
        <Avatar src={crew} className={classes.logo} />
        <Box className={classes.leftMost} ml={2}>
          <Hidden smDown>
            <Typography variant="h5">Among Us Stats Tracker</Typography>
          </Hidden>
          <Hidden mdUp>
            <Typography variant="h5">AUST</Typography>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.leftMost} />
          </Hidden>
        </Box>
        <Tooltip title="View scoreboard">
          <BreakpointButton
            text="Summary"
            icon={<GamepadIcon />}
            label="view scoreboard"
            onClick={() => {
              set(true);
            }}
          />
        </Tooltip>
        <Tooltip title="New game">
          <BreakpointButton
            text="Add game"
            icon={<AddIcon />}
            label="add new game"
            onClick={() => {
              dispatch(statsSlice.actions.newGame());
            }}
          />
        </Tooltip>
      </Toolbar>
      {show && <Summary close={() => set(false)} />}
    </>
  );
}

function BreakpointButton({
  text,
  onClick,
  icon,
  label,
}: {
  text: string;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSmallDevice) {
    return (
      <IconButton aria-label={label} onClick={onClick}>
        {icon}
      </IconButton>
    );
  }

  return (
    <Button endIcon={icon} onClick={onClick} aria-label={label} style={{ minWidth: '150px' }}>
      {text}
    </Button>
  );
}

export default TableToolbar;
