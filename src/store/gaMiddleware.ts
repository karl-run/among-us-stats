import GA from 'react-ga';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

import { statsSlice } from './statsRedux';

export const gaMiddleware: Middleware = () => (next) => (action) => {
  const [part, actionName] = action.type.split('/');

  if (part === 'stats') {
    GA.event({ category: part, action: actionName, label: getLabelFromActionPayload(action) });
  }

  return next(action);
};

function getLabelFromActionPayload({ type, payload }: PayloadAction<unknown>): string | undefined {
  switch (type) {
    case statsSlice.actions.finishGame.toString():
      const finishGamePayload = payload as Parameters<typeof statsSlice.actions.finishGame>['0'];

      return finishGamePayload.winner ?? 'null';
    case statsSlice.actions.newPlayers.toString():
      const newPlayersPayload = payload as Parameters<typeof statsSlice.actions.newPlayers>['0'];

      return `${newPlayersPayload.length}`;
    default:
      return undefined;
  }
}

export default gaMiddleware;
