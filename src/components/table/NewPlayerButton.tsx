import { useDispatch } from 'react-redux';
import React, { useState, ChangeEvent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';

import { statsSlice } from '../../store/statsRedux';

function NewPlayerButton(): JSX.Element {
  const dispatch = useDispatch();
  const [show, set] = useState(false);
  const [value, setValue] = React.useState('');
  const newPlayers = value.split(',').filter((it) => !!it);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const closeDialog = () => {
    set(false);
    setValue('');
  };

  const addPlayers = () => {
    dispatch(statsSlice.actions.newPlayers(newPlayers));
    closeDialog();
  };

  return (
    <>
      <Tooltip title="Add players">
        <Button
          aria-label="add new player"
          onClick={() => {
            set(true);
          }}
        >
          Add players
        </Button>
      </Tooltip>
      {show && (
        <Dialog onClose={closeDialog} aria-labelledby="simple-dialog-title" open>
          <DialogTitle id="simple-dialog-title">Add players</DialogTitle>
          <Box p={2} pt={0}>
            <TextField
              color="primary"
              id="standard-basic"
              label="Players to add"
              helperText="Separated by commas"
              value={value}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addPlayers();
                }
              }}
              fullWidth
            />
          </Box>
          <Box p={2} pt={0} display="flex" flexWrap="wrap" style={{ maxWidth: '350px' }}>
            {newPlayers.map((it) => (
              <Box key={it} mr={1} mt={1}>
                <Chip label={it} />
              </Box>
            ))}
          </Box>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button color="secondary" onClick={addPlayers}>
              Add {newPlayers.length} players
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default NewPlayerButton;
