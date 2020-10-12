import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const hasBeenShownIntroKey = 'hasBeenShownIntro';

export type SortPlayersBy = 'Games played' | 'Total win rate' | 'Impostor win rate' | 'Crew win rate' | 'Impostor rate';

interface CommonState {
  showHelp: boolean;
  sortPlayersBy: SortPlayersBy;
}

const initialStatsState: CommonState = {
  showHelp: !localStorage.getItem(hasBeenShownIntroKey),
  sortPlayersBy: 'Games played',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialStatsState,
  reducers: {
    toggleShowHelp: (state) => {
      state.showHelp = !state.showHelp;
    },
    sortPlayerBy: (state, action: PayloadAction<CommonState['sortPlayersBy']>) => {
      state.sortPlayersBy = action.payload;
    },
  },
});
