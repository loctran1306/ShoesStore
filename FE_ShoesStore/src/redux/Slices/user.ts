/* eslint-disable import/no-cycle */
import { GetUserProfile } from 'src/sections/_shoes/services/user';
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from 'src/types/user';
import { dispatch } from '../store';

const initialState: IUserState = {
  isLoading: false,
  error: null,
  userProfile: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserProfile(state, action) {
      state.userProfile = action.payload;
      state.isLoading = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const getUserDetail = async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await GetUserProfile();
    dispatch(slice.actions.getUserProfile(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const resetUser = () => {
  dispatch(slice.actions.getUserProfile(null));
};

export const { startLoading, hasError } = slice.actions;

export default slice.reducer;
