import { v4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatsState {
  session: Session;
}

export interface Session {
  players: Player[];
  games: Game[];
}

export interface Player {
  name: string;
  winRate: number;
  impostorRate: number;
}

export interface Game {
  gameId: string;
  winner: 'crew' | 'impostor' | null;
  impostors: string[];
}

const initialStatsState: StatsState = {
  session: {
    players: [],
    games: [
      {
        gameId: v4(),
        impostors: [],
        winner: null,
      },
    ],
  },
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
      state.session?.games.push({
        gameId: v4(),
        impostors: [],
        winner: null,
      });
    },
    newPlayers: (state, action: PayloadAction<string[]>) => {
      const newPlayers: Player[] = action.payload.map((it) => ({
        name: it,
        impostorRate: 0,
        winRate: 0,
      }));
      state.session?.players.push(...newPlayers);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const session = getSession(state);

      session.players = session.players.filter((it) => it.name !== action.payload);
    },
    resetSession: (state) => {
      state.session = initialStatsState.session;
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
    },
  },
});

function updatePlayerStats(state: StatsState) {
  const session = getSession(state);

  const impostors = session.games.flatMap((it) => it.impostors);
  session.players.forEach((player) => {
    player.impostorRate =
      impostors.reduce((acc, value) => acc + (value === player.name ? 1 : 0), 0) / session.games.length;
  });
}

function findGame(gameId: string, state: StatsState): Game {
  const game: Game | undefined = state.session?.games.find((it) => it.gameId === gameId);

  if (!game) throw Error(`Unable to find game with ID ${gameId}`);

  return game;
}

function getSession(state: StatsState): Session {
  const { session } = state;

  if (!session) throw Error('Illegal state: No active session');

  return session;
}
