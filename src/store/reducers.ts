import { combineReducers } from '@reduxjs/toolkit';

import { commonSlice } from './commonRedux';
import { statsSlice } from './statsRedux';

export default combineReducers({
  stats: statsSlice.reducer,
  common: commonSlice.reducer,
});
