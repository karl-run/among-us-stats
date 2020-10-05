import React from 'react';
import { Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { useSelector } from 'react-redux';

import SummaryCard from '../shared/SummaryCard';
import { RootState } from '../../store/redux';

import Watermark from './Watermark';

interface Props {
  open: boolean;
  close: () => void;
}

function SummaryDialog({ open, close }: Props): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const session = useSelector((state: RootState) => state.stats.session);

  return (
    <Dialog
      onClose={close}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
      fullScreen={isSmallDevice}
    >
      <SummaryCard session={session} />
      <Watermark />
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SummaryDialog;
