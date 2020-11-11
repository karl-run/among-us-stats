import React, { MutableRefObject, useState } from 'react';
import GA from 'react-ga';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import Box from '@material-ui/core/Box';
import { Button, Snackbar } from '@material-ui/core';

import { RootState } from '../../store/redux';

import DiscordIcon from './icons/DiscordIcon';

function DiscordShareButton({ shareBoxRef }: { shareBoxRef: MutableRefObject<HTMLDivElement | null> }): JSX.Element {
  const theme = useTheme();
  const discordShareUrl = useSelector((state: RootState) => state.settings.discordShareWebhook);
  const [shareResult, setShareResult] = useState<'good' | 'bad' | null>(null);

  if (!discordShareUrl) {
    throw new Error("Illegal state: Don't show share button without URL set in settings");
  }

  const handleClick = async () => {
    if (!shareBoxRef.current) return;

    GA.event({ category: 'Social', action: 'sharedDiscord' });

    const canvasElement = await html2canvas(shareBoxRef.current, {
      backgroundColor: theme.palette.background.paper,
    });

    canvasElement.toBlob(async (blob) => {
      if (!blob) throw Error('Blob is null for some reason');

      try {
        const timestamp = new Date().toISOString();
        const formData = new FormData();
        formData.append('file', blob, `${timestamp}.png`);

        const result = await fetch(discordShareUrl, {
          method: 'POST',
          body: formData,
        });

        if (result.status < 299) {
          setShareResult('good');
        } else {
          console.error(result.status, result.statusText);
          setShareResult('bad');
        }
      } catch (e) {
        console.error(e);
        setShareResult('bad');
      }
    }, 'image/png');
  };

  return (
    <Box position="absolute" top={8} right={8}>
      <Button onClick={handleClick} endIcon={<DiscordIcon />}>
        Share
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={shareResult != null}
        autoHideDuration={6000}
        onClose={() => setShareResult(null)}
        message={shareResult === 'good' ? 'Shared to Discord' : 'Sharing failed!'}
      />
    </Box>
  );
}

export default DiscordShareButton;
