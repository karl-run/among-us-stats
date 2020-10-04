import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PlusOne';
import { useDispatch } from 'react-redux';

import { statsSlice } from '../../store/statsRedux';

function TableToolbar(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Toolbar>
      <Typography variant="h5" style={{ flex: '1 1 100%' }}>
        Among Us Stats Tracker
      </Typography>
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
