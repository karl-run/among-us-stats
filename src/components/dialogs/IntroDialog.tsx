import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import AfkIcon from '@material-ui/icons/Hotel';
import GamepadIcon from '@material-ui/icons/Gamepad';
import AddIcon from '@material-ui/icons/PlusOne';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import exampleImage from '../../images/example.png';
import { commonSlice, hasBeenShownIntroKey } from '../../store/common/commonRedux';
import { RootState } from '../../store/redux';
import ImpostorIcon from '../shared/icons/ImpostorIcon';

const useStyles = makeStyles((theme) => ({
  fakeCheckbox: {
    height: theme.spacing(1),
    width: theme.spacing(1),
    margin: theme.spacing(0, 0.5),
    paddingBottom: theme.spacing(1.5),
    pointerEvents: 'none',
  },
  fakeButton: {
    pointerEvents: 'none',
  },
  innerFakeButtonIcon: {
    marginBottom: theme.spacing(0.5),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  exampleImage: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

function IntroDialog(): JSX.Element | null {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shouldShow = useSelector((state: RootState) => state.common.showHelp);

  const handleClose = () => {
    dispatch(commonSlice.actions.toggleShowHelp());
    localStorage.setItem(hasBeenShownIntroKey, 'true');
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Dialog
      open
      onClose={() => {
        dispatch(commonSlice.actions.toggleShowHelp());
      }}
    >
      <DialogTitle>Welcome!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is a app that lets you get some stats and scoreboards when playing Among Us
        </DialogContentText>
        <Typography variant="h6">How does it work?</Typography>
        <DialogContentText>Add the friends you are currently playing with using the current session.</DialogContentText>
        <DialogContentText>
          Play some games and for each game, mark who was the impostor (tick the checkbox so it looks like
          <Checkbox checkedIcon={<ImpostorIcon />} checked size="small" className={classes.fakeCheckbox} />
          ), or mark them as AFK (tick the checkbox again so it looks like{' '}
          <Checkbox indeterminateIcon={<AfkIcon />} indeterminate size="small" className={classes.fakeCheckbox} />) if
          they were not present for that game. Add more games using the{' '}
          <IconButton className={classes.fakeButton} size="small">
            <AddIcon className={classes.innerFakeButtonIcon} />
          </IconButton>
          -button.
        </DialogContentText>
        <DialogContentText>
          Once {`you've`} played a few rounds, check the scoreboard by clicking the Summary
          <IconButton className={classes.fakeButton} size="small">
            <GamepadIcon className={classes.innerFakeButtonIcon} />
          </IconButton>
          -button. Then {`you'll`} get a scorecard like this, that lists your win rates, impostor rate and win rate as a
          specific role.
        </DialogContentText>
        <img src={exampleImage} alt="example scoreboard" className={classes.exampleImage} />
        <DialogContentText>
          To start a new gaming session, hit the New Session{' '}
          <IconButton className={classes.fakeButton} size="small">
            <AddCircleOutlineIcon className={classes.innerFakeButtonIcon} />
          </IconButton>
          -button. That way you can always check your previous gaming sessions{`'`} scoreboards.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          {`OK, cool!`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IntroDialog;
