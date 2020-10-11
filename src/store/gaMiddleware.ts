import GA from 'react-ga';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

import { statsSlice } from './stats/statsRedux';

export const gaMiddleware: Middleware = () => (next) => (action) => {
  const [part, actionName] = action.type.split('/');

  if (part === 'stats') {
    GA.event({ category: part, action: actionName, label: getLabelFromActionPayload(action) });
  }

  try {
    next(action);
  } catch (e) {
    GA.event({ category: 'error', action: 'redux-error', label: e.message });
    throw e;
  }
};

function getLabelFromActionPayload({ type, payload }: PayloadAction<unknown>): string | undefined {
  switch (type) {
    case statsSlice.actions.finishGame.toString():
      const finishGamePayload = payload as Parameters<typeof statsSlice.actions.finishGame>['0'];

      return finishGamePayload.winner ?? 'null';
    case statsSlice.actions.newPlayers.toString():
      const newPlayersPayload = payload as Parameters<typeof statsSlice.actions.newPlayers>['0'];

      return `new:${newPlayersPayload.newPlayerNames.length},existing${newPlayersPayload.existingPlayers.length}`;
    default:
      return undefined;
  }
}

export default gaMiddleware;
