import { RootState } from '../redux';
import { Game, UUID } from '../stats/statsRedux';
import { Omit } from '@material-ui/core';

export type RootState_V2 = Omit<RootState, 'stats'> & {
  stats: Omit<RootState['stats'], 'previousSessions'>;
};

export interface Player_V3 {
  name: string;
  winRates: {
    total: number;
    impostor: number;
    crew: number;
  };
  impostorRate: number;
  isAfk: boolean;
}

type Session_V3 = {
  sessionId: UUID;
  name: string | undefined;
  players: Player_V3[];
  games: Game[];
};

export type RootState_V3 = {
  stats: {
    session: Session_V3;
    previousSessions: Session_V3[];
  };
};

export type RootState_V4 = RootState_V5;

interface StatsState_V5 {
  session: Session_V3;
  previousSessions: Session_V3[];
}

export interface Game_V5 {
  gameId: string;
  winner: 'crew' | 'impostor' | null;
  impostors: string[];
  players: string[];
}

export type RootState_V5 = {
  stats: StatsState_V5;
};

type Session_V6 = Omit<RootState['stats']['session'], 'lastGamePlayed'>;

interface StatsState_V6 {
  session: Session_V6;
  previousSessions: Session_V6[];
  players: RootState['stats']['players'];
}

export type RootState_V6 = {
  stats: StatsState_V6;
};
