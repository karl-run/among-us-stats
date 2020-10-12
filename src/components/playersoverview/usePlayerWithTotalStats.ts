import { useSelector } from 'react-redux';
import { map } from 'rambda';
import { useMemo } from 'react';

import { RootState } from '../../store/redux';
import { Game, Player, Session, UUID } from '../../store/stats/statsRedux';
import { getWinnersPerGame, WinnersPerGameTuple } from '../../store/stats/statsUtils';

export interface PlayerStats extends Player {
  gamesPlayed: number;
  totalImpostorRate: number;
  totalWinRate: number;
  totalImpostorWinRate: number;
  totalCrewWinRate: number;
}

interface MetaStats {
  totalGames: number;
  totalPlayers: number;
  totalSessions: number;
}

function usePlayersWithTotalStats(): [PlayerStats[], MetaStats] {
  const statsState = useSelector((state: RootState) => state.stats);

  return useMemo(() => {
    const allSessions: Session[] = [statsState.session, ...statsState.previousSessions].filter(
      (it) => it.players.length !== 0,
    );
    const allGames: Game[] = allSessions.flatMap((session) => session.games);
    const allImpostors: UUID[] = allGames.flatMap((game) => game.impostors);
    const winnersPerGame: WinnersPerGameTuple[] = getWinnersPerGame(allGames);
    const gameCountPerPlayer: Record<UUID, number> = map(
      (player) => allGames.filter((game) => game.players.includes(player.playerId)).length,
      statsState.players,
    );

    return [
      Object.keys(statsState.players).map((playerId) => {
        const playerGameCount = gameCountPerPlayer[playerId];
        const playerImpostorCount = allImpostors.filter((it) => it === playerId).length;
        return {
          playerId,
          name: statsState.players[playerId].name,
          gamesPlayed: playerGameCount,
          totalImpostorRate: playerImpostorCount / playerGameCount,
          totalWinRate: winnersPerGame.filter(([winners]) => winners.includes(playerId)).length / playerGameCount,
          totalImpostorWinRate:
            playerImpostorCount > 0
              ? winnersPerGame.filter(([winners, wonByImpostors]) => wonByImpostors && winners.includes(playerId))
                  .length / playerImpostorCount
              : -1,
          totalCrewWinRate:
            playerGameCount - playerImpostorCount > 0
              ? winnersPerGame.filter(([winners, wonByImpostors]) => !wonByImpostors && winners.includes(playerId))
                  .length /
                (playerGameCount - playerImpostorCount)
              : -1,
        };
      }),
      {
        totalGames: allGames.length,
        totalPlayers: Object.keys(statsState.players).length,
        totalSessions: allSessions.length,
      },
    ];
  }, [statsState]);
}

export default usePlayersWithTotalStats;
