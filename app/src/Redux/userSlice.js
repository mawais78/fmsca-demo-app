import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logUser: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeLoggedUser(state, { payload }) {
      state.logUser = payload
    },
    updateAvailableMessages(state, { payload }) {
      state.logUser.availableMessages = payload.availableMessages
    },
    updateAvailableOffers(state, { payload }) {
      state.logUser.availableOffers = payload.availableOffers
    },
  },
});

export const { storeLoggedUser, updateAvailableMessages, updateAvailableOffers } = userSlice.actions;

export default userSlice.reducer;