import React from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import SummaryCard from '../shared/SummaryCard';
import { RootState } from '../../store/redux';
import { Session, statsSlice } from '../../store/statsRedux';
import { BreakpointLinkButton } from '../shared/BreakpointButton';

function Sessions(): JSX.Element {
  const dispatch = useDispatch();
  const previous: Session[] = useSelector((state: RootState) => state.stats.previousSessions);
  const current: Session = useSelector((state: RootState) => state.stats.session);

  const createHandleSwapClick = (sessionId: string) => () => {
    dispatch(statsSlice.actions.swapSession(sessionId));
  };

  return (
    <Container maxWidth="xl">
      <Box pt={4}>
        <Box pb={1}>
          <BreakpointLinkButton
            text="Current session"
            startIcon={<ArrowBackIcon />}
            label="Current session"
            to="/"
            noBreak
          />
        </Box>
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
                    <Button size="small" onClick={createHandleSwapClick(it.sessionId)}>
                      Set as active
                    </Button>
                  }
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Sessions;
