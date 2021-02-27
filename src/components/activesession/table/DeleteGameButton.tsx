import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, MenuItem } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { statsSlice } from '../../../store/stats/statsRedux';

interface Props {
  gameId: string;
  gameNumber: number;
  onDelete: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.dark,
  },
}));

function DeleteGameButton({ gameId, gameNumber, onDelete }: Props): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, set] = useState(false);

  const handleDelete = () => {
    dispatch(statsSlice.actions.deleteGame(gameId));
    onDelete();
  };

  return (
    <>
      <MenuItem onClick={() => set(true)} aria-label="Delete this session">
        Remove game
      </MenuItem>
      <Dialog open={open} onClose={() => set(false)}>
        <DialogTitle>Remove game {gameNumber}?</DialogTitle>
        <DialogActions>
          <Button onClick={() => set(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary" className={classes.button}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteGameButton;
