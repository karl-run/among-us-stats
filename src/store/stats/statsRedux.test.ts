import { configureStore, DeepPartial, EnhancedStore } from '@reduxjs/toolkit';

import reducers from '../reducers';
import { RootState } from '../redux';
import { createSessionPlayers, testPlayers } from '../../test/testData';

import { initialStatsState, statsSlice } from './statsRedux';

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

  describe('deleteGame', () => {
    it('should delete only the game with the provided gameId', () => {
      const store = setupStore({
        stats: {
          ...initialStatsState,
          players: testPlayers,
          session: {
            ...initialStatsState.session,
            players: createSessionPlayers(testPlayers),
            games: [
              { ...initialStatsState.session.games[0], gameId: 'game-1-id' },
              { ...initialStatsState.session.games[0], gameId: 'game-2-id' },
              { ...initialStatsState.session.games[0], gameId: 'game-3-id' },
            ],
          },
        },
      });

      store.dispatch(statsSlice.actions.deleteGame('game-2-id'));

      const result = store.getState().stats;

      expect(result.session.games).toHaveLength(2);
      expect(result.session.games[0].gameId).toEqual('game-1-id');
      expect(result.session.games[1].gameId).toEqual('game-3-id');
    });

    it('should throw error if provided gameId does not exist', () => {
      const store = setupStore({
        stats: {
          ...initialStatsState,
          players: testPlayers,
          session: {
            ...initialStatsState.session,
            players: createSessionPlayers(testPlayers),
            games: [{ ...initialStatsState.session.games[0], gameId: 'game-1-id' }],
          },
        },
      });

      const action = () => store.dispatch(statsSlice.actions.deleteGame('game-2-id'));

      expect(action).toThrow('No game with gameId game-2-id was found');
    });
  });
});
