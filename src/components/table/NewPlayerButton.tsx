import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import GA from 'react-ga';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import WarningOutlined from '@material-ui/icons/WarningOutlined';

import { EnhancedPlayer, Session, statsSlice } from '../../store/stats/statsRedux';
import IconInfoText from '../shared/IconInfoText';

interface Props {
  session: Session<EnhancedPlayer>;
  noPlayers: boolean;
}

function NewPlayerButton({ session, noPlayers }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [show, set] = useState(false);
  const [value, setValue] = React.useState('');
  const newPlayers = value
    .split(',')
    .map((it) => it.trim())
    .filter((it) => !!it);
  const duplicatePlayers = session.players.filter((it) => newPlayers.includes(it.name));

  useEffect(() => {
    if (show) {
      GA.event({ category: 'View', action: 'addPlayerDialog' });
    }
  }, [show]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const closeDialog = () => {
    set(false);
    setValue('');
  };

  const addPlayers = () => {
    dispatch(statsSlice.actions.newPlayers({ newPlayerNames: newPlayers, existingPlayers: [] }));
    closeDialog();
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && duplicatePlayers.length === 0) {
      event.preventDefault();
      addPlayers();
    }
  };

  return (
    <>
      <Tooltip title="Add players to current session">
        <Button
          autoFocus={noPlayers}
          aria-label="add new player to current session"
          onClick={() => {
            set(true);
          }}
        >
          Add players
        </Button>
      </Tooltip>
      {show && (
        <Dialog onClose={closeDialog} aria-labelledby="simple-dialog-title" open fullWidth maxWidth="xs">
          <DialogTitle id="simple-dialog-title">Add one or more players</DialogTitle>
          <Box p={2} pt={0}>
            <TextField
              color="primary"
              id="standard-basic"
              label="Players to add"
              helperText="Separated by commas"
              value={value}
              onChange={handleChange}
              onKeyDown={handleOnKeyDown}
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
          {duplicatePlayers.length > 0 && (
            <Box>
              <IconInfoText
                text={`${duplicatePlayers.map((it) => it.name).join(', ')} are already in this game`}
                icon={<WarningOutlined />}
              />
            </Box>
          )}
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button color="secondary" onClick={addPlayers} disabled={duplicatePlayers.length > 0}>
              Add {newPlayers.length} players
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default NewPlayerButton;
