import { createSlice } from '@reduxjs/toolkit';

export const hasBeenShownIntroKey = 'hasBeenShownIntro';

interface CommonState {
  showHelp: boolean;
}

const initialStatsState: CommonState = {
  showHelp: !localStorage.getItem(hasBeenShownIntroKey),
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialStatsState,
  reducers: {
    toggleShowHelp: (state) => {
      state.showHelp = !state.showHelp;
    },
  },
});
