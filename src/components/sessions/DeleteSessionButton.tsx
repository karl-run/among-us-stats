import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Button } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { Session, statsSlice } from '../../store/statsRedux';

interface Props {
  session: Session;
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.dark,
  },
}));

function DeleteSessionButton({ session }: Props): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, set] = useState(false);

  const handleDelete = () => {
    dispatch(statsSlice.actions.deleteSession(session.sessionId));
  };

  return (
    <>
      <IconButton size="small" onClick={() => set(true)}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={open} onClose={() => set(false)}>
        <DialogTitle>Delete session {`"${session.name ?? 'Unnamed'}"?`}</DialogTitle>
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

export default DeleteSessionButton;
