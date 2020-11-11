import { createMigrate } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { v4 } from 'uuid';

import { RootState } from '../redux';
import { Player, UUID } from '../stats/statsRedux';
import { now, sub } from '../../utils/dateUtils';

import { RootState_V2, RootState_V3, RootState_V4, RootState_V5, RootState_V6 } from './previousTypes';

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
    const persistedState = (state as unknown) as RootState_V3;
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
    const persistedState = (state as unknown) as RootState_V4;

    persistedState.stats.session.games.reverse();
    persistedState.stats.previousSessions.forEach((session) => {
      session.games.reverse();
    });

    return (persistedState as unknown) as PersistedState;
  },
  6: (state) => {
    console.info('Migrating from 5 to 6, normalising players');
    const persistedState = (state as unknown) as RootState_V5;

    const existingPlayerNames: Set<string> = new Set(
      [
        ...persistedState.stats.previousSessions.flatMap((session) => {
          return session.players.map((player) => player.name);
        }),
        ...persistedState.stats.session.players.map((player) => player.name),
      ].map((player) => player.trim()),
    );

    const oldToNewPlayerMap: Record<string, UUID> = {};
    existingPlayerNames.forEach((existingPlayer) => {
      oldToNewPlayerMap[existingPlayer] = v4();
    });

    const oldNameToNewPlayerId = (oldName: string): UUID => oldToNewPlayerMap[oldName.trim()];
    const oldToNewSession = (oldSession: RootState_V5['stats']['session']): RootState_V6['stats']['session'] => ({
      ...oldSession,
      players: oldSession.players.map((player) => ({
        playerId: oldNameToNewPlayerId(player.name),
        impostorRate: player.impostorRate,
        winRates: player.winRates,
        isAfk: player.isAfk,
      })),
      games: oldSession.games.map((it) => ({
        ...it,
        impostors: it.impostors.map(oldNameToNewPlayerId),
        players: it.players.map(oldNameToNewPlayerId),
      })),
    });

    const newPlayerMap: Record<UUID, Player> = {};
    Object.keys(oldToNewPlayerMap).forEach((name) => {
      const newPlayer: Player = {
        playerId: oldToNewPlayerMap[name],
        name,
      };

      newPlayerMap[newPlayer.playerId] = newPlayer;
    });

    const newState: Omit<RootState_V6, 'common'> = {
      stats: {
        players: newPlayerMap,
        session: oldToNewSession(persistedState.stats.session),
        previousSessions: persistedState.stats.previousSessions.map(oldToNewSession),
      },
    };

    return (newState as unknown) as PersistedState;
  },
  7: (state) => {
    console.info('Migrating from 6 to 7, adding timestamps to sessions');
    const persistedState = (state as unknown) as RootState_V6;

    const newState: Omit<RootState, 'common' | 'settings'> = {
      ...persistedState,
      stats: {
        ...persistedState.stats,
        session: {
          ...persistedState.stats.session,
          lastGamePlayed: now(),
        },
        previousSessions: [...persistedState.stats.previousSessions].reverse().map((it, index) => {
          return {
            ...it,
            lastGamePlayed: sub(now(), { days: 1, hours: index }),
          };
        }),
      },
    };

    return (newState as unknown) as PersistedState;
  },
};

export default createMigrate(migrations, { debug: false });
