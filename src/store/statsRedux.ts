import { v4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatsState {
  session: Session;
  previousSessions: Session[];
}

export interface Session {
  sessionId: string;
  name: string | undefined;
  players: Player[];
  games: Game[];
}

export interface Player {
  name: string;
  winRates: {
    total: number;
    impostor: number;
    crew: number;
  };
  impostorRate: number;
  isAfk: boolean;
}

export interface Game {
  gameId: string;
  winner: 'crew' | 'impostor' | null;
  impostors: string[];
  players: string[];
}

const initialStatsState: StatsState = {
  session: {
    sessionId: v4(),
    name: 'My first game session',
    players: [],
    games: [
      {
        gameId: v4(),
        impostors: [],
        winner: null,
        players: [],
      },
    ],
  },
  previousSessions: [],
};
export const statsSlice = createSlice({
  name: 'stats',
  initialState: initialStatsState,
  reducers: {
    toggleImpostor: (state, action: PayloadAction<{ gameId: string; player: string }>) => {
      const game = findGame(action.payload.gameId, state);

      if (game.impostors.includes(action.payload.player)) {
        game.impostors.splice(game.impostors.indexOf(action.payload.player), 1);
      } else {
        game.impostors.push(action.payload.player);
      }

      updatePlayerStats(state);
    },
    newGame: (state) => {
      state.session?.games.unshift({
        gameId: v4(),
        impostors: [],
        winner: null,
        players: state.session.players.filter((it) => !it.isAfk).map((it) => it.name),
      });
    },
    toggleAfk: (state, action: PayloadAction<string>) => {
      const player = state.session.players.find((it) => it.name === action.payload);

      if (!player) throw Error(`No player with name ${action.payload}`);

      player.isAfk = !player.isAfk;

      updatePlayerStats(state);
    },
    finishGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        winner: 'crew' | 'impostor' | null;
      }>,
    ) => {
      const game = findGame(action.payload.gameId, state);

      game.winner = action.payload.winner;

      updatePlayerStats(state);
    },
    removePlayerFromGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        player: string;
      }>,
    ) => {
      const game = findGame(action.payload.gameId, state);

      game.players.splice(game.players.indexOf(action.payload.player), 1);
      const impostorIndex = game.impostors.indexOf(action.payload.player);
      if (impostorIndex > -1) {
        game.impostors.splice(impostorIndex, 1);
      }

      updatePlayerStats(state);
    },
    addPlayerToGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        player: string;
      }>,
    ) => {
      const game = findGame(action.payload.gameId, state);

      game.players.push(action.payload.player);

      updatePlayerStats(state);
    },
    newPlayers: (state, action: PayloadAction<string[]>) => {
      const isFirstPlayers = state.session.players.length === 0;
      const newPlayers: Player[] = action.payload.map((it) => ({
        name: it,
        impostorRate: 0,
        winRates: {
          total: 0,
          crew: 0,
          impostor: 0,
        },
        isAfk: false,
      }));
      state.session?.players.push(...newPlayers);

      if (isFirstPlayers) {
        state.session.games[0].players = newPlayers.map((it) => it.name);
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const session = getCurrentSession(state);

      session.players = session.players.filter((it) => it.name !== action.payload);

      session.games.forEach((game) => {
        game.players = game.players.filter((it) => it !== action.payload);
        game.impostors = game.impostors.filter((it) => it !== action.payload);
      });

      updatePlayerStats(state);
    },
    newSession: (state) => {
      state.previousSessions.push(state.session);
      state.session = {
        ...initialStatsState.session,
        sessionId: v4(),
        name: 'New session',
      };
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      if (state.session.sessionId === action.payload) {
        state.session = initialStatsState.session;
        return;
      }

      state.previousSessions.splice(
        state.previousSessions.findIndex((it) => it.sessionId === action.payload),
        1,
      );
    },
    setSessionName: (state, action: PayloadAction<{ sessionId: string; newName: string | undefined }>) => {
      const session = findSession(action.payload.sessionId, state);

      session.name = action.payload.newName;
    },
    swapSession: (state, action: PayloadAction<string>) => {
      if (state.session.sessionId === action.payload) {
        return state;
      }

      const session = findSession(action.payload, state);
      const sessionIndex = state.previousSessions.findIndex((it) => it.sessionId === session.sessionId);

      state.previousSessions.splice(sessionIndex, 1);
      state.previousSessions.push(state.session);
      state.session = session;
    },
  },
});

function updatePlayerStats(state: StatsState) {
  const session = getCurrentSession(state);

  const impostors = session.games.flatMap((it) => it.impostors);
  const winnersPerGame: WinnersPerGameTuple[] = getWinnersPerGame(session);

  session.players.forEach((player) => {
    const gameCount = session.games.flatMap((it) => it.players).filter((it) => it === player.name).length;
    if (gameCount === 0) {
      player.impostorRate = -1;
      player.winRates = {
        impostor: -1,
        total: -1,
        crew: -1,
      };
      return;
    }

    const impostorCount = impostors.filter((it) => it === player.name).length;
    player.impostorRate = impostorCount / gameCount;
    player.winRates = {
      total: winnersPerGame.filter(([winners]) => winners.includes(player.name)).length / gameCount,
      impostor:
        impostorCount > 0
          ? winnersPerGame.filter(([winners, wonByImpostors]) => wonByImpostors && winners.includes(player.name))
              .length / impostorCount
          : -1,
      crew:
        gameCount - impostorCount > 0
          ? winnersPerGame.filter(([winners, wonByImpostors]) => !wonByImpostors && winners.includes(player.name))
              .length /
            (gameCount - impostorCount)
          : -1,
    };
  });
}

type WinnersPerGameTuple = [winners: string[], wonByImpostors: boolean];

function getWinnersPerGame(session: Session): WinnersPerGameTuple[] {
  return session.games
    .map((it) => {
      if (it.winner === 'impostor') {
        return [it.players.filter((player) => it.impostors.includes(player)), true];
      } else if (it.winner === 'crew') {
        return [it.players.filter((player) => !it.impostors.includes(player)), false];
      } else {
        return null;
      }
    })
    .filter((it): it is WinnersPerGameTuple => it != null);
}

function findGame(gameId: string, state: StatsState): Game {
  const game: Game | undefined = state.session?.games.find((it) => it.gameId === gameId);

  if (!game) throw Error(`Unable to find game with ID ${gameId}`);

  return game;
}

function findSession(sessionId: string, state: StatsState): Session {
  if (state.session.sessionId === sessionId) {
    return state.session;
  }

  const session: Session | undefined = state.previousSessions.find((it) => it.sessionId === sessionId);

  if (!session) throw Error(`Unable to find session with session ID ${sessionId}`);

  return session;
}

function getCurrentSession(state: StatsState): Session {
  const { session } = state;

  if (!session) throw Error('Illegal state: No active session');

  return session;
}
