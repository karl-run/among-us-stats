import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/PlusOne';
import GamepadIcon from '@material-ui/icons/Gamepad';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import SummaryDialog from '../summary/SummaryDialog';
import { Session, statsSlice } from '../../store/statsRedux';
import BreakpointButton from '../shared/BreakpointButton';
import EditableTitle from '../shared/EditableTitle';

const useStyles = makeStyles({
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  autoPad: {
    flex: '1 1 auto',
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

interface Props {
  session: Session;
}

function TableToolbar({ session }: Props): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [show, set] = useState(false);

  return (
    <>
      <Toolbar>
        <Box ml={2} className={classes.title}>
          <EditableTitle session={session} variant="h5" />
        </Box>
        <Box className={classes.autoPad} />
        <BreakpointButton
          text="Summary"
          endIcon={<GamepadIcon />}
          label="View scoreboard"
          onClick={() => {
            set(true);
          }}
        />
        <BreakpointButton
          text="Add game"
          endIcon={<AddIcon />}
          label={session.players.length === 0 ? 'Add some players first' : 'Add new game'}
          disabled={session.players.length === 0}
          onClick={() => {
            dispatch(statsSlice.actions.newGame());
          }}
        />
      </Toolbar>
      <SummaryDialog open={show} close={() => set(false)} />
    </>
  );
}

export default TableToolbar;
