import { Player, UUID } from './statsRedux';

export function getPlayer(players: Record<UUID, Player>, playerId: UUID): Player {
  const player: Player | undefined = players[playerId];

  if (!player) throw Error(`No player with ID ${playerId} found`);

  return player;
}
