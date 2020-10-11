import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import SummaryCard from '../shared/SummaryCard';
import { statsSlice } from '../../store/stats/statsRedux';
import BreakpointButton from '../shared/BreakpointButton';
import { getPreviousSessions } from '../../store/stats/statsSelectors';
import { byDate } from '../../utils/dateUtils';

import DeleteSessionButton from './DeleteSessionButton';

function Sessions(): JSX.Element {
  const dispatch = useDispatch();
  const previous = useSelector(getPreviousSessions);
  const history = useHistory();

  const createHandleSwapClick = (sessionId: string) => () => {
    dispatch(statsSlice.actions.swapSession({ sessionId }));
    history.push('/');
  };

  return (
    <Grid container spacing={3}>
      {previous.sort(byDate).map((it) => (
        <Grid key={it.sessionId} item xs={12} md={6}>
          <Paper>
            <SummaryCard
              session={it}
              extraActions={
                <>
                  <BreakpointButton
                    text="Set as active"
                    startIcon={<CheckIcon />}
                    onClick={createHandleSwapClick(it.sessionId)}
                    label="Set this session as active"
                    size="small"
                  />
                  <DeleteSessionButton session={it} />
                </>
              }
            />
          </Paper>
        </Grid>
      ))}
      {previous.length === 0 && (
        <Grid item xs={12}>
          <Box p={4} display="flex" justifyContent="center">
            <Box>
              <Typography variant="h5">No previous sessions found</Typography>
              <Box m={2} />
              <Typography variant="body1">
                Finish your current session and click the {`"New session"`} button!
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default Sessions;
