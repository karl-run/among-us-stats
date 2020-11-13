import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField/TextField';
import Box from '@material-ui/core/Box';
import { Check, Close, ExpandMore } from '@material-ui/icons';
import GA from 'react-ga';

import { commonSlice } from '../../store/common/commonRedux';
import { RootState } from '../../store/redux';
import { settingsSlice } from '../../store/settings/settingsRedux';

function SettingsDialog(): JSX.Element | null {
  const dispatch = useDispatch();
  const shouldShow = useSelector((state: RootState) => state.common.showSettings);
  const settings = useSelector((state: RootState) => state.settings);
  const [testResult, setTestResult] = useState<'untested' | 'good' | 'bad'>('untested');

  useEffect(() => {
    if (shouldShow) {
      GA.event({ category: 'View', action: 'settingsDialog' });
    }
  }, [shouldShow]);

  const handleClose = () => {
    dispatch(commonSlice.actions.toggleSettings());
  };

  if (!shouldShow) {
    return null;
  }

  const testUrl = async () => {
    const formData = new FormData();
    formData.append(
      'payload_json',
      JSON.stringify({
        content: 'If you see this message you have set up the integration correctly! :ballot_box_with_check: ',
      }),
    );

    try {
      const result = await fetch(settings.discordShareWebhook ?? '', {
        method: 'POST',
        body: formData,
      });

      if (result.status < 299) {
        GA.event({ category: 'Social', action: 'testDiscordWebhook', label: 'hook-good' });
        setTestResult('good');
      } else {
        GA.event({ category: 'Social', action: 'testDiscordWebhook', label: 'hook-bad-response' });
        setTestResult('bad');
      }
    } catch (e) {
      console.error(e);
      GA.event({ category: 'Social', action: 'testDiscordWebhook', label: 'hook-bad-request' });
      setTestResult('bad');
    }
  };

  return (
    <Dialog
      open
      onClose={() => {
        dispatch(commonSlice.actions.toggleSettings());
        setTestResult('untested');
      }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Discord integration</Typography>
        <DialogContentText>
          If you configure a Discord webhook URL you will be able to share the score directly from the summary card.
        </DialogContentText>
        <Box pt={1} pb={1}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>How do I get a webhook URL?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol>
                <li>Open the Discord channel you want to use</li>
                <li>From the channel menu, select Edit channel.</li>
                <li>Click on Webhooks menu item.</li>
                <li>Click the Create Webhook button and fill in the name of the bot that will post the messages.</li>
                <li>Note the URL from the WEBHOOK URL field.</li>
                <li>Click the Save button.</li>
                <li>Paste the URL into the field in this settings dialog</li>
              </ol>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box pt={1}>
          <TextField
            id="discord-share-webhook"
            label="Discord Webhook URL"
            variant="outlined"
            defaultValue={settings.discordShareWebhook}
            fullWidth
            onFocus={() => {
              setTestResult('untested');
            }}
            onBlur={(event) => {
              dispatch(settingsSlice.actions.setDiscordShareWebhook(event.target.value || null));
              setTestResult('untested');
            }}
          />
        </Box>
        <Box pt={1} display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            disabled={!settings.discordShareWebhook}
            endIcon={testResult === 'good' ? <Check /> : testResult === 'bad' ? <Close color="error" /> : null}
            onClick={testUrl}
          >
            Test URL
          </Button>
        </Box>
        <DialogContentText>
          {testResult === 'good'
            ? 'Seems good! Did you see a message in the Discord channel?'
            : testResult === 'bad'
            ? "Something isn't set up right"
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsDialog;
