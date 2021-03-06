import { RootState } from '../redux';

import { EnhancedPlayer, Player, Session, SessionPlayer, UUID } from './statsRedux';
import { getPlayer } from './statsUtils';

const createEnhancePlayer = (players: Record<UUID, Player>) => (
  sessionPlayer: SessionPlayer,
): EnhancedPlayer | null => {
  const player = getPlayer(players, sessionPlayer.playerId);

  if (player == null) {
    return null;
  }

  return {
    ...player,
    ...sessionPlayer,
  };
};

export const getSession = (state: RootState): Session<EnhancedPlayer> => {
  const enhancePlayer = createEnhancePlayer(state.stats.players);

  return {
    ...state.stats.session,
    players: state.stats.session.players.map(enhancePlayer).filter((it): it is Player & SessionPlayer => it != null),
  };
};

export const getPreviousSessions = (state: RootState): Session<EnhancedPlayer>[] => {
  const enhancePlayer = createEnhancePlayer(state.stats.players);

  return state.stats.previousSessions.map((session) => ({
    ...session,
    players: session.players.map(enhancePlayer).filter((it): it is Player & SessionPlayer => it != null),
  }));
};

export const getPlayers = (state: RootState): Player[] =>
  Object.keys(state.stats.players).map((it) => state.stats.players[it]);
