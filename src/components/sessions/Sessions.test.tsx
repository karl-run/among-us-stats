import React from 'react';
import userEvent from '@testing-library/user-event';

import { providerRender, screen } from '../../test/testUtils';
import { initialStatsState } from '../../store/stats/statsRedux';
import { createSessionPlayers, testPlayers } from '../../test/testData';

import Sessions from './Sessions';

describe('Sessions', () => {
  describe('when clicking "Set active" button', () => {
    it('should set session as active and put current one in previous', () => {
      const [, store] = providerRender(<Sessions />, {
        initialState: {
          stats: {
            ...initialStatsState,
            players: testPlayers,
            session: {
              ...initialStatsState.session,
              sessionId: 'originally-current-session',
              players: createSessionPlayers(testPlayers),
            },
            previousSessions: [{ ...initialStatsState.session, sessionId: 'session-to-set-active' }],
          },
        },
      });

      userEvent.click(screen.getByRole('button', { name: 'Set this session as active' }));

      expect(store.getState().stats.session.sessionId).toEqual('session-to-set-active');
    });
  });

  describe('when clicking delete button', () => {
    it('should show confirmation dialog and delete from state', () => {
      const [, store] = providerRender(<Sessions />, {
        initialState: {
          stats: {
            ...initialStatsState,
            players: testPlayers,
            session: {
              ...initialStatsState.session,
              players: createSessionPlayers(testPlayers),
            },
            previousSessions: [
              { ...initialStatsState.session, sessionId: 'session-to-delete', name: 'Not very important session' },
            ],
          },
        },
      });

      userEvent.click(screen.getByRole('button', { name: 'Delete this session' }));

      expect(screen.getByRole('heading', { name: 'Delete session "Not very important session"?' })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Delete' }));

      expect(store.getState().stats.previousSessions).toHaveLength(0);
    });
  });
});
