import userEvent from '@testing-library/user-event';
import React from 'react';

import { providerRender, screen, waitFor } from '../../test/testUtils';
import { initialStatsState } from '../../store/stats/statsRedux';
import { testPlayers } from '../../test/testData';

import SummaryCard from './SummaryCard';

describe('SummaryCard', () => {
  it('clicking the title should enable user to edit session name', () => {
    const testSession = {
      sessionId: 'test-session',
      name: 'My test session',
      games: [],
      players: [],
      lastGamePlayed: new Date().toISOString(),
    };
    const [, store] = providerRender(<SummaryCard session={testSession} />, {
      initialState: {
        stats: {
          ...initialStatsState,
          players: testPlayers,
          session: testSession,
          previousSessions: [],
        },
      },
    });

    userEvent.click(screen.getByRole('heading', { name: 'My test session' }));
    userEvent.type(screen.getByTestId('edit-session-name'), 'My new session name');
    userEvent.tab();

    waitFor(() => expect(store.getState().stats.session.name).toEqual('My new session name'));
    expect(screen.queryByRole('edit-session-name')).not.toBeInTheDocument();
  });
});
