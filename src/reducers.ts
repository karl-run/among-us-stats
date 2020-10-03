import { v4 } from "uuid";
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Session {
  players: Player[];
  games: Game[];
}

interface StatsState {
  session: Session | null;
}

export interface Player {
  name: string;
  winRate: number;
  impostorRate: number;
}

export interface Game {
  gameId: string;
  winner: "crew" | "impostor" | null;
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
  name: "stats",
  initialState: initialStatsState,
  reducers: {
    toggleImpostor: (
      state,
      action: PayloadAction<{ gameId: string; player: string }>
    ) => {
      const game: Game | undefined = state.session?.games.find(
        (it) => it.gameId === action.payload.gameId
      );
      if (!game) throw Error("Uh oh! Fucko wucko :(");

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
      const session = state?.session;

      if (!session) throw Error("Uh oh! Fucko wucko :(");

      session.players = session.players.filter(
        (it) => it.name !== action.payload
      );
    },
    finishGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        winner: "crew" | "impostor" | null;
      }>
    ) => {
      const game: Game | undefined = state.session?.games.find(
        (it) => it.gameId === action.payload.gameId
      );
      if (!game) throw Error("Uh oh! Fucko wucko :(");

      game.winner = action.payload.winner;
    },
  },
});

function updatePlayerStats(state: StatsState) {
  const session = state?.session;

  if (!session) throw Error("Uh oh! Fucko wucko :(");

  const impostors = session.games.flatMap((it) => it.impostors);
  session.players.forEach((player) => {
    player.impostorRate =
      impostors.reduce(
        (acc, value) => acc + (value === player.name ? 1 : 0),
        0
      ) / session.games.length;
  });
}

export default combineReducers({
  stats: statsSlice.reducer,
});
