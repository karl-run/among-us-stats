import React, { useEffect } from 'react';
import GA from 'react-ga';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import { Email, GitHub } from '@material-ui/icons';
import ExternalLink from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/redux';
import { commonSlice, hasBeenShownIntroKey } from '../../store/common/commonRedux';

function FeedbackDialog(): JSX.Element | null {
  const dispatch = useDispatch();
  const shouldShow = useSelector((state: RootState) => state.common.showFeedback);

  useEffect(() => {
    if (shouldShow) {
      GA.event({ category: 'View', action: 'feedbackDialog' });
    }
  }, [shouldShow]);

  const handleClose = () => {
    dispatch(commonSlice.actions.toggleFeedback());
    localStorage.setItem(hasBeenShownIntroKey, 'true');
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Feedback or report a bug</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} justify="center">
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <Tab
                label="On Github"
                icon={<GitHub />}
                component={ExternalLink}
                href="https://github.com/karl-run/among-us-stats/issues/new/choose"
                target="_blank"
                rel="noreferrer noopener"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <Tab
                label="Email me"
                icon={<Email />}
                component={ExternalLink}
                href="mailto:k@rl.run?subject=Among%20Us%20Scoreboard%20App%3A%20Feedback"
                target="_blank"
                rel="noreferrer noopener"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedbackDialog;
