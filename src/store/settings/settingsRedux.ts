import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  discordShareWebhook: string | null;
}

const initialStatsState: SettingsState = {
  discordShareWebhook: null,
};

export const settingsSlice = createSlice({
  name: 'common',
  initialState: initialStatsState,
  reducers: {
    setDiscordShareWebhook: (state, action: PayloadAction<string | null>) => {
      state.discordShareWebhook = action.payload;
    },
  },
});
