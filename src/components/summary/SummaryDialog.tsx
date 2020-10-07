import React, { useEffect } from 'react';
import GA from 'react-ga';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Button from '@material-ui/core/Button';
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

  useEffect(() => {
    GA.event({ category: 'View', action: 'summaryDialog' });
  }, []);

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
