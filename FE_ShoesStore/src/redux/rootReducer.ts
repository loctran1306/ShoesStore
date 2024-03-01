/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slices/user';

const rootPersistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

export { rootReducer, rootPersistConfig };
