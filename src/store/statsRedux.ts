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
  winRates: {
    total: number;
    impostor: number;
    crew: number;
  };
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
    newPlayers: (state, action: PayloadAction<string[]>) => {
      const newPlayers: Player[] = action.payload.map((it) => ({
        name: it,
        impostorRate: 0,
        winRates: {
          total: 0,
          crew: 0,
          impostor: 0,
        },
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
  },
});

function updatePlayerStats(state: StatsState) {
  const session = getSession(state);

  const impostors = session.games.flatMap((it) => it.impostors);
  const winnersPerGame: WinnersPerGameTuple[] = getWinnersPerGame(session);

  const gameCount = session.games.length;
  session.players.forEach((player) => {
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
        return [session.players.filter((player) => it.impostors.includes(player.name)).map((it) => it.name), true];
      } else if (it.winner === 'crew') {
        return [session.players.filter((player) => !it.impostors.includes(player.name)).map((it) => it.name), false];
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

function getSession(state: StatsState): Session {
  const { session } = state;

  if (!session) throw Error('Illegal state: No active session');

  return session;
}
