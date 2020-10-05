import { createMigrate } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import { v4 } from 'uuid';

import { RootState } from './redux';

type RootState_V2 = Omit<RootState, 'stats'> & {
  stats: Omit<RootState['stats'], 'previousSessions'>;
};

const migrations: MigrationManifest = {
  2: () => {
    return undefined;
  },
  3: (state) => {
    const persistedState = (state as unknown) as RootState_V2;
    return ({
      ...persistedState,
      stats: {
        session: {
          ...persistedState.stats.session,
          sessionId: v4(),
          name: 'My first session',
        },
        previousSessions: [],
      },
    } as unknown) as PersistedState;
  },
};

export default createMigrate(migrations, { debug: false });
