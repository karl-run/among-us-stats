import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';

import { Player, statsSlice } from '../../store/statsRedux';
import { percentIt } from '../../utils/mathUtils';

interface Props {
  player: Player;
  close: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.dark,
  },
}));

const RemovePlayerMenuItem: ForwardRefRenderFunction<HTMLLIElement, Props> = (
  { player, close }: Props,
  ref,
): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, set] = useState(false);

  const handleDelete = () => {
    close();
    dispatch(statsSlice.actions.removePlayer(player.name));
  };

  return (
    <>
      <MenuItem ref={ref} onClick={() => set(true)}>
        Remove
      </MenuItem>
      <Dialog open={open} onClose={() => set(false)}>
        <DialogTitle>Remove player {`"${player.name ?? 'Unnamed'}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This player has won {percentIt(player.winRates.total)} games and been impostor in{' '}
            {percentIt(player.impostorRate)}
            and will be removed from these games
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => set(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary" className={classes.button}>
            Yes, remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default forwardRef(RemovePlayerMenuItem);
