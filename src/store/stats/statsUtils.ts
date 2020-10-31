import GA from 'react-ga';

import { Game, Player, UUID } from './statsRedux';

export function getPlayer(players: Record<UUID, Player>, playerId: UUID): Player {
  const player = players[playerId];

  if (!player) {
    GA.event({ category: 'Error', action: 'Missing player' });
    return { name: 'Unknown player', playerId: 'unknown' };
  }

  return player;
}

export type WinnersPerGameTuple = [winners: string[], wonByImpostors: boolean];

export function getWinnersPerGame(games: Game[]): WinnersPerGameTuple[] {
  return games
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
