import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

import { statsSlice } from '../store/statsRedux';

import IconInfoText from './shared/IconInfoText';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  clearButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8),
    },
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box m={2} display="flex" justifyContent="space-between" className={classes.wrapper}>
      <IconInfoText
        text="Remember to mark the winners for each game by clicking the tick mark below a game"
        icon={<InfoIcon />}
      />
      <Tooltip title="DANGER! No warning will pop up">
        <Button
          className={classes.clearButton}
          endIcon={<DeleteForeverIcon />}
          onClick={() => {
            dispatch(statsSlice.actions.resetSession());
          }}
        >
          Clear everything
        </Button>
      </Tooltip>
    </Box>
  );
}

export default Footer;
