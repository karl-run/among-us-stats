import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import WarningOutlined from '@material-ui/icons/WarningOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import IconInfoText from '../../../shared/IconInfoText';
import { EnhancedPlayer, Session, statsSlice, UUID } from '../../../../store/stats/statsRedux';
import { getPlayers } from '../../../../store/stats/statsSelectors';

import AutoCompletePlayerInput, { PlayerOption } from './AutoCompletePlayerInput';

interface Props {
  session: Session<EnhancedPlayer>;
  closeDialog: () => void;
}

function NewPlayerDialog({ session, closeDialog }: Props): JSX.Element {
  const dispatch = useDispatch();
  const playersNotInSession = useSelector(getPlayers).filter(
    (player) => !session.players.find((sessionPlayer) => sessionPlayer.playerId === player.playerId),
  );
  const [newPlayers, setNewPlayers] = useState<PlayerOption[]>([]);

  const duplicatePlayers = session.players.filter((it) =>
    newPlayers.find((ac) => ac.playerId === it.playerId || ac.name === it.name),
  );

  const addPlayers = () => {
    dispatch(
      statsSlice.actions.newPlayers({
        newPlayerNames: newPlayers.filter((it) => it.playerId == null).map((it) => it.name),
        existingPlayers: newPlayers.map((it) => it.playerId).filter((it): it is UUID => it != null),
      }),
    );
    closeDialog();
  };

  return (
    <Dialog open onClose={closeDialog} aria-labelledby="add-player-title" fullWidth maxWidth="xs" disableBackdropClick>
      <DialogTitle id="add-player-title">Add one or more players</DialogTitle>
      <Box p={2} pt={0}>
        <AutoCompletePlayerInput existingPlayers={playersNotInSession} onChange={(it) => setNewPlayers(it)} />
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
        <Button
          color="secondary"
          onClick={addPlayers}
          disabled={duplicatePlayers.length > 0 || newPlayers.length === 0}
        >
          Add {newPlayers.length} players
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewPlayerDialog;
