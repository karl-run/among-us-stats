import { v4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { now } from '../../utils/dateUtils';

import { getPlayer } from './statsUtils';

export type UUID = ReturnType<typeof v4>;

interface StatsState {
  session: Session;
  previousSessions: Session[];
  players: Record<UUID, Player>;
}

export interface Player {
  playerId: UUID;
  name: string;
}

export type EnhancedPlayer = Player & SessionPlayer;

export interface Session<T extends EnhancedPlayer | SessionPlayer = SessionPlayer> {
  sessionId: UUID;
  name: string | undefined;
  players: T[];
  games: Game[];
  lastGamePlayed: string;
}

export interface SessionPlayer {
  playerId: UUID;
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
  impostors: UUID[];
  players: UUID[];
}

export const initialStatsState: StatsState = {
  session: {
    sessionId: v4(),
    name: 'My first game session',
    players: [],
    lastGamePlayed: now(),
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
  players: {},
};

const newPlayerDefaults = {
  impostorRate: -1,
  winRates: {
    total: -1,
    crew: -1,
    impostor: -1,
  },
  isAfk: false,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState: initialStatsState,
  reducers: {
    newGame: (state) => {
      state.session.games.unshift({
        gameId: v4(),
        impostors: [],
        winner: null,
        players: state.session.players.filter((it) => !it.isAfk).map((it) => it.playerId),
      });

      state.session.lastGamePlayed = now();
    },
    finishGame: (
      state,
      action: PayloadAction<{
        gameId: UUID;
        winner: 'crew' | 'impostor' | null;
      }>,
    ) => {
      const game = getGame(action.payload.gameId, state);

      game.winner = action.payload.winner;

      updatePlayerStats(state);
    },
    newPlayers: (state, action: PayloadAction<{ newPlayerNames: string[]; existingPlayers: UUID[] }>) => {
      const isFirstPlayers = state.session.games.length === 1;

      const newPlayers = action.payload.newPlayerNames
        .map((newPlayerName): Player => addPlayer(state, newPlayerName))
        .map(
          (player): SessionPlayer => ({
            playerId: player.playerId,
            ...newPlayerDefaults,
          }),
        );

      const newExistingPlayers = action.payload.existingPlayers
        .map((existingPlayerId) => getPlayer(state.players, existingPlayerId))
        .map(
          (player): SessionPlayer => ({
            playerId: player.playerId,
            ...newPlayerDefaults,
          }),
        );

      state.session?.players.push(...newPlayers, ...newExistingPlayers);

      if (isFirstPlayers) {
        state.session.games[0].players.push(
          ...newPlayers.map((it) => it.playerId),
          ...newExistingPlayers.map((it) => it.playerId),
        );
      }
    },
    removePlayerFromGame: (
      state,
      action: PayloadAction<{
        gameId: UUID;
        playerId: UUID;
      }>,
    ) => {
      const game = getGame(action.payload.gameId, state);

      game.players.splice(game.players.indexOf(action.payload.playerId), 1);
      const impostorIndex = game.impostors.indexOf(action.payload.playerId);
      if (impostorIndex > -1) {
        game.impostors.splice(impostorIndex, 1);
      }

      updatePlayerStats(state);
    },
    addPlayerToGame: (
      state,
      action: PayloadAction<{
        gameId: UUID;
        playerId: UUID;
      }>,
    ) => {
      const game = getGame(action.payload.gameId, state);

      game.players.push(action.payload.playerId);

      updatePlayerStats(state);
    },
    toggleImpostor: (state, action: PayloadAction<{ gameId: string; playerId: UUID }>) => {
      const game = getGame(action.payload.gameId, state);

      if (game.impostors.includes(action.payload.playerId)) {
        game.impostors.splice(game.impostors.indexOf(action.payload.playerId), 1);
      } else {
        game.impostors.push(action.payload.playerId);
      }

      updatePlayerStats(state);
    },
    toggleAfk: (state, action: PayloadAction<{ playerId: UUID }>) => {
      const player = state.session.players.find((it) => it.playerId === action.payload.playerId);

      if (!player) throw Error(`No player with name ${action.payload}`);

      player.isAfk = !player.isAfk;

      updatePlayerStats(state);
    },
    removePlayer: (state, action: PayloadAction<{ playerId: UUID }>) => {
      const session = getCurrentSession(state);

      session.players = session.players.filter((it) => it.playerId !== action.payload.playerId);

      session.games.forEach((game) => {
        game.players = game.players.filter((it) => it !== action.payload.playerId);
        game.impostors = game.impostors.filter((it) => it !== action.payload.playerId);
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
    deleteSession: (state, action: PayloadAction<{ sessionId: UUID }>) => {
      if (state.session.sessionId === action.payload.sessionId) {
        state.session = initialStatsState.session;
        return;
      }

      state.previousSessions.splice(
        state.previousSessions.findIndex((it) => it.sessionId === action.payload.sessionId),
        1,
      );

      cleanUpUnusedPlayers(state);
    },
    setSessionName: (state, action: PayloadAction<{ sessionId: string; newName: string | undefined }>) => {
      const session = getSession(action.payload.sessionId, state);

      session.name = action.payload.newName;
    },
    swapSession: (state, action: PayloadAction<{ sessionId: UUID }>) => {
      if (state.session.sessionId === action.payload.sessionId) {
        return state;
      }

      const session = getSession(action.payload.sessionId, state);
      const sessionIndex = state.previousSessions.findIndex((it) => it.sessionId === session.sessionId);

      state.previousSessions.splice(sessionIndex, 1);
      state.previousSessions.push(state.session);
      state.session = session;
    },
  },
});

function playerExists(players: Record<UUID, Player>, newPlayerName: string): boolean {
  return (
    Object.keys(players)
      .map((it) => players[it])
      .filter((player) => player.name === newPlayerName).length > 0
  );
}

function getPlayerByName(players: Record<UUID, Player>, playerName: string): Player {
  const player = Object.keys(players)
    .map((it) => players[it])
    .find((player) => player.name === playerName);

  if (!player) throw Error(`No player with name ${playerName} found`);

  return player;
}

function addPlayer(state: StatsState, newPlayerName: string): Player {
  if (playerExists(state.players, newPlayerName)) {
    const newPlayer = getPlayerByName(state.players, newPlayerName);
    state.players[newPlayer.playerId] = newPlayer;
    return newPlayer;
  }

  const newPlayer: Player = {
    playerId: v4(),
    name: newPlayerName,
  };

  state.players[newPlayer.playerId] = newPlayer;
  return newPlayer;
}

function updatePlayerStats(state: StatsState) {
  const session = getCurrentSession(state);

  const impostors = session.games.flatMap((it) => it.impostors);
  const winnersPerGame: WinnersPerGameTuple[] = getWinnersPerGame(session);

  session.players.forEach((player) => {
    const gameCount = session.games.flatMap((it) => it.players).filter((it) => it === player.playerId).length;
    if (gameCount === 0) {
      player.impostorRate = -1;
      player.winRates = {
        impostor: -1,
        total: -1,
        crew: -1,
      };
      return;
    }

    const impostorCount = impostors.filter((it) => it === player.playerId).length;
    player.impostorRate = impostorCount / gameCount;
    player.winRates = {
      total: winnersPerGame.filter(([winners]) => winners.includes(player.playerId)).length / gameCount,
      impostor:
        impostorCount > 0
          ? winnersPerGame.filter(([winners, wonByImpostors]) => wonByImpostors && winners.includes(player.playerId))
              .length / impostorCount
          : -1,
      crew:
        gameCount - impostorCount > 0
          ? winnersPerGame.filter(([winners, wonByImpostors]) => !wonByImpostors && winners.includes(player.playerId))
              .length /
            (gameCount - impostorCount)
          : -1,
    };
  });
}

function cleanUpUnusedPlayers(state: StatsState) {
  const allUsedPlayerIds = state.previousSessions
    .flatMap((previousSession) => previousSession.players)
    .map((player) => player.playerId);
  const unusedPlayerIds = Object.keys(state.players).filter((playerId) => !allUsedPlayerIds.includes(playerId));

  unusedPlayerIds.forEach((unusedPlayerId) => {
    delete state.players[unusedPlayerId];
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

function getGame(gameId: string, state: StatsState): Game {
  const game: Game | undefined = state.session?.games.find((it) => it.gameId === gameId);

  if (!game) throw Error(`Unable to find game with ID ${gameId}`);

  return game;
}

function getSession(sessionId: string, state: StatsState): Session {
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
