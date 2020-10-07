import React from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';

import SummaryCard from '../shared/SummaryCard';
import { RootState } from '../../store/redux';
import { Session, statsSlice } from '../../store/statsRedux';
import BreakpointButton, { BreakpointLinkButton } from '../shared/BreakpointButton';

import DeleteSessionButton from './DeleteSessionButton';

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
    </Container>
  );
}

export default Sessions;
