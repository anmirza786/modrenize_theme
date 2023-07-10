import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import User from './slices/users';
import Dialogs from './slices/dialogs';

const store = configureStore({
  reducer: combineReducers({
    User,
    Dialogs
  }),
});

export const { dispatch, getState } = store;

export default store;