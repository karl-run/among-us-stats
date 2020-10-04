import { combineReducers } from '@reduxjs/toolkit';

import { statsSlice } from './statsRedux';

export default combineReducers({
  stats: statsSlice.reducer,
});
