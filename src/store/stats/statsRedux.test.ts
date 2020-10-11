import { configureStore, DeepPartial, EnhancedStore } from '@reduxjs/toolkit';

import reducers from '../reducers';
import { RootState } from '../redux';

import { initialStatsState, Player, SessionPlayer, statsSlice, UUID } from './statsRedux';

const testPlayers = {
  'cd7bc1c7-de86-4b46-a6f8-908c30b33e61': {
    playerId: 'cd7bc1c7-de86-4b46-a6f8-908c30b33e61',
    name: 'Test man 1',
  },
  '0ca893e6-92cd-4081-8dfc-9669b98d9768': {
    playerId: '0ca893e6-92cd-4081-8dfc-9669b98d9768',
    name: 'Test man 1',
  },
  '0159fc9c-1547-48af-8611-c210ad7a12af': {
    playerId: '0159fc9c-1547-48af-8611-c210ad7a12af',
    name: 'Test man 1',
  },
};

const createSessionPlayers = (players: Record<UUID, Player>): SessionPlayer[] =>
  Object.keys(players).map(
    (it): SessionPlayer => ({
      playerId: it,
      impostorRate: 0,
      winRates: {
        total: 0,
        crew: 0,
        impostor: 0,
      },
      isAfk: false,
    }),
  );

describe('statsRedux', () => {
  const setupStore = (initialState: DeepPartial<RootState>): EnhancedStore<RootState> => {
    return configureStore({
      reducer: reducers,
      preloadedState: initialState,
    });
  };

  describe('newGame', () => {
    it('should add a new game to the session with the existing players', () => {
      const store = setupStore({
        stats: {
          ...initialStatsState,
          players: testPlayers,
          session: {
            ...initialStatsState.session,
            players: createSessionPlayers(testPlayers),
          },
        },
      });

      store.dispatch(statsSlice.actions.newGame());

      const result = store.getState().stats;

      expect(result.session.games).toHaveLength(2);
      expect(result.session.games[0].players).toEqual([
        'cd7bc1c7-de86-4b46-a6f8-908c30b33e61',
        '0ca893e6-92cd-4081-8dfc-9669b98d9768',
        '0159fc9c-1547-48af-8611-c210ad7a12af',
      ]);
    });

    it('should add a new game to the session but not AFK players', () => {
      const sessionPlayers = createSessionPlayers(testPlayers);
      sessionPlayers[0].isAfk = true;
      const store = setupStore({
        stats: {
          ...initialStatsState,
          players: testPlayers,
          session: {
            ...initialStatsState.session,
            players: sessionPlayers,
          },
        },
      });

      store.dispatch(statsSlice.actions.newGame());

      const result = store.getState().stats;

      expect(result.session.games).toHaveLength(2);
      expect(result.session.games[0].players).toEqual([
        '0ca893e6-92cd-4081-8dfc-9669b98d9768',
        '0159fc9c-1547-48af-8611-c210ad7a12af',
      ]);
    });
  });
});
