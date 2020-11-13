import React, { useEffect } from 'react';
import GA from 'react-ga';
import ExternalLink from '@material-ui/core/Link';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Tab from '@material-ui/core/Tab';
import { Email, GitHub } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import useBoolean from '../shared/hooks/useBoolean';
import BreakpointButton from '../shared/BreakpointButton';

function FeedbackButton(): JSX.Element {
  const [isOpen, actions] = useBoolean();

  useEffect(() => {
    if (isOpen) {
      GA.event({ category: 'View', action: 'feedbackDialog' });
    }
  }, [isOpen]);

  return (
    <>
      <BreakpointButton
        text="Feedback / Bug"
        endIcon={<FeedbackIcon />}
        label="Give feedback or report a bug"
        onClick={actions.open}
      />
      <Dialog open={isOpen} onClose={actions.close}>
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
          <Button onClick={actions.close}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FeedbackButton;
