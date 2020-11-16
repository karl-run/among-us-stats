import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const hasBeenShownIntroKey = 'hasBeenShownIntro';
export const hasVisitedSettingsKey = 'hasVisitedSettings';

export type SortPlayersBy = 'Games played' | 'Total win rate' | 'Impostor win rate' | 'Crew win rate' | 'Impostor rate';

interface CommonState {
  showHelp: boolean;
  showSettings: boolean;
  showFeedback: boolean;
  showSummary: boolean;
  sortPlayersBy: SortPlayersBy;
}

const initialStatsState: CommonState = {
  showHelp: typeof window !== 'undefined' ? !localStorage.getItem(hasBeenShownIntroKey) : true,
  showSettings: false,
  showFeedback: false,
  showSummary: false,
  sortPlayersBy: 'Games played',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialStatsState,
  reducers: {
    toggleShowHelp: (state) => {
      state.showHelp = !state.showHelp;
    },
    toggleFeedback: (state) => {
      state.showFeedback = !state.showFeedback;
    },
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
    toggleSummary: (state) => {
      state.showSummary = !state.showSummary;
    },
    sortPlayerBy: (state, action: PayloadAction<CommonState['sortPlayersBy']>) => {
      state.sortPlayersBy = action.payload;
    },
  },
});
