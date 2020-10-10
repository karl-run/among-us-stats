import { combineReducers } from '@reduxjs/toolkit';

import { commonSlice } from './common/commonRedux';
import { statsSlice } from './stats/statsRedux';

export default combineReducers({
  stats: statsSlice.reducer,
  common: commonSlice.reducer,
});
