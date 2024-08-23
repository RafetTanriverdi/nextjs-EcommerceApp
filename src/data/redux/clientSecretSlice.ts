// app/features/clientSecretSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClientSecretState {
  value: string | null;
}

const initialState: ClientSecretState = {
  value: null,
};

const clientSecretSlice = createSlice({
  name: 'clientSecret',
  initialState,
  reducers: {
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearClientSecret: (state) => {
      state.value = null;
    },
  },
});

export const { setClientSecret, clearClientSecret } = clientSecretSlice.actions;

export default clientSecretSlice.reducer;
