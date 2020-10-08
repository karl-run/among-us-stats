import { createMigrate } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { v4 } from 'uuid';

import { RootState } from './redux';

type RootState_V2 = Omit<RootState, 'stats'> & {
  stats: Omit<RootState['stats'], 'previousSessions'>;
};

const migrations: MigrationManifest = {
  2: () => {
    console.info('Migrating from 1 to 2, wiping');
    return undefined;
  },
  3: (state) => {
    console.info('Migrating from 2 to 3, adding session id and session management');
    const persistedState = (state as unknown) as RootState_V2;
    return ({
      ...persistedState,
      stats: {
        session: {
          ...persistedState.stats.session,
          sessionId: v4(),
          name: 'My first session',
        },
        previousSessions: [],
      },
    } as unknown) as PersistedState;
  },
  4: (state) => {
    console.info('Migrating from 3 to 4, adding afk status and players to games ');
    const persistedState = (state as unknown) as RootState;
    return ({
      ...persistedState,
      stats: {
        session: {
          ...persistedState.stats.session,
          players: persistedState.stats.session.players.map((it) => ({
            ...it,
            isAfk: false,
          })),
          games: persistedState.stats.session.games.map((game) => ({
            ...game,
            players: persistedState.stats.session.players.map((player) => player.name),
          })),
        },
        previousSessions: persistedState.stats.previousSessions.map((it) => ({
          ...it,
          players: persistedState.stats.session.players.map((it) => ({
            ...it,
            isAfk: false,
          })),
          games: it.games.map((game) => ({
            ...game,
            players: it.players.map((player) => player.name),
          })),
        })),
      },
    } as unknown) as PersistedState;
  },
  5: (state) => {
    console.info('Migrating from 4 to 5, reversing order of all games');
    const persistedState = (state as unknown) as RootState;

    persistedState.stats.session.games.reverse();
    persistedState.stats.previousSessions.forEach((session) => {
      session.games.reverse();
    });

    return (persistedState as unknown) as PersistedState;
  },
};

export default createMigrate(migrations, { debug: false });
