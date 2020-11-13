import React, { useEffect, useState } from 'react';
import GA from 'react-ga';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { EnhancedPlayer, Session } from '../../../../store/stats/statsRedux';

import NewPlayerDialog from './NewPlayerDialog';

interface Props {
  session: Session<EnhancedPlayer>;
  noPlayers: boolean;
}

function NewPlayerButton({ session, noPlayers }: Props): JSX.Element {
  const [show, set] = useState(false);

  useEffect(() => {
    if (show) {
      GA.event({ category: 'View', action: 'addPlayerDialog' });
    }
  }, [show]);

  const closeDialog = () => {
    set(false);
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
      {show && <NewPlayerDialog session={session} closeDialog={closeDialog} />}
    </>
  );
}

export default NewPlayerButton;
