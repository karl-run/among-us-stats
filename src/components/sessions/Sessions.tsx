import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';

import SummaryCard from '../shared/SummaryCard';
import { statsSlice } from '../../store/stats/statsRedux';
import BreakpointButton from '../shared/BreakpointButton';
import { getPreviousSessions, getSession } from '../../store/stats/statsSelectors';

import DeleteSessionButton from './DeleteSessionButton';

function Sessions(): JSX.Element {
  const dispatch = useDispatch();
  const previous = useSelector(getPreviousSessions);
  const current = useSelector(getSession);

  const createHandleSwapClick = (sessionId: string) => () => {
    dispatch(statsSlice.actions.swapSession({ sessionId }));
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <Paper elevation={10}>
            <SummaryCard session={current} />
          </Paper>
        </Grid>
        {previous.map((it) => (
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
      </Grid>
    </Box>
  );
}

export default Sessions;
