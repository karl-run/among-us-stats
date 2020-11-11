import { combineReducers } from '@reduxjs/toolkit';

import { commonSlice } from './common/commonRedux';
import { settingsSlice } from './settings/settingsRedux';
import { statsSlice } from './stats/statsRedux';

export default combineReducers({
  stats: statsSlice.reducer,
  common: commonSlice.reducer,
  settings: settingsSlice.reducer,
});
