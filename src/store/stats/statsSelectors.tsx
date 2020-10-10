import { RootState } from '../redux';

import { EnhancedPlayer, Player, Session, SessionPlayer, UUID } from './statsRedux';
import { getPlayer } from './statsUtils';

const createEnhancePlayer = (players: Record<UUID, Player>) => (sessionPlayer: SessionPlayer): EnhancedPlayer => ({
  ...getPlayer(players, sessionPlayer.playerId),
  ...sessionPlayer,
});

export const getSession = (state: RootState): Session<EnhancedPlayer> => {
  const enhancePlayer = createEnhancePlayer(state.stats.players);

  return {
    ...state.stats.session,
    players: state.stats.session.players.map(enhancePlayer),
  };
};

export const getPreviousSessions = (state: RootState): Session<EnhancedPlayer>[] => {
  const enhancePlayer = createEnhancePlayer(state.stats.players);

  return state.stats.previousSessions.map((session) => ({
    ...session,
    players: session.players.map(enhancePlayer),
  }));
};
