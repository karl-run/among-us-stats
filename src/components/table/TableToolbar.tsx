import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PlusOne';
import GamepadIcon from '@material-ui/icons/Gamepad';
import { useDispatch } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import { statsSlice } from '../../store/statsRedux';

const useStyles = makeStyles({
  leftMost: {
    flex: '1 1 100%',
  },
});

function TableToolbar(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Toolbar>
      <Hidden smDown>
        <Typography variant="h5" className={classes.leftMost}>
          Among Us Stats Tracker
        </Typography>
      </Hidden>
      <Hidden mdUp>
        <Box className={classes.leftMost} />
      </Hidden>
      <Tooltip title="View scoreboard">
        <Button
          endIcon={<GamepadIcon />}
          aria-label="view scoreboard"
          onClick={() => {
            dispatch(statsSlice.actions.newGame());
          }}
          style={{ minWidth: '150px' }}
        >
          Summary
        </Button>
      </Tooltip>
      <Tooltip title="New game">
        <Button
          endIcon={<AddIcon />}
          aria-label="add new game"
          onClick={() => {
            dispatch(statsSlice.actions.newGame());
          }}
          style={{ minWidth: '150px' }}
        >
          Add a game
        </Button>
      </Tooltip>
    </Toolbar>
  );
}

export default TableToolbar;
