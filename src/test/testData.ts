import { Player, SessionPlayer, UUID } from '../store/stats/statsRedux';

export const testPlayers = {
  'cd7bc1c7-de86-4b46-a6f8-908c30b33e61': {
    playerId: 'cd7bc1c7-de86-4b46-a6f8-908c30b33e61',
    name: 'Test man 1',
  },
  '0ca893e6-92cd-4081-8dfc-9669b98d9768': {
    playerId: '0ca893e6-92cd-4081-8dfc-9669b98d9768',
    name: 'Test man 1',
  },
  '0159fc9c-1547-48af-8611-c210ad7a12af': {
    playerId: '0159fc9c-1547-48af-8611-c210ad7a12af',
    name: 'Test man 1',
  },
};

export const createSessionPlayers = (players: Record<UUID, Player>): SessionPlayer[] =>
  Object.keys(players).map(
    (it): SessionPlayer => ({
      playerId: it,
      impostorRate: 0,
      winRates: {
        total: 0,
        crew: 0,
        impostor: 0,
      },
      isAfk: false,
    }),
  );
