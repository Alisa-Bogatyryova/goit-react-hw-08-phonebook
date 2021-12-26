import * as actions from './auth-actions';

import authOperations from './auth-operations';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const setUser = payload => ({
  name: payload.user.name,
  email: payload.user.email,
});

const user = createReducer(
  { name: null, email: null },
  {
    [authOperations.register.fulfilled]: (state, { payload }) =>
      setUser(payload),
    [authOperations.logIn.fulfilled]: (state, { payload }) => setUser(payload),
    [authOperations.checkCurrentUser.fulfilled]: (state, { payload }) => ({
      name: payload.name,
      email: payload.email,
    }),
    [authOperations.logOut.fulfilled]: (state, { payload }) => ({
      name: null,
      email: null,
    }),
  },
);

const token = createReducer(null, {
  [authOperations.register.fulfilled]: (state, { payload }) => payload.token,
  [authOperations.logIn.fulfilled]: (state, { payload }) => payload.token,
  [authOperations.logOut.fulfilled]: () => null,
});

const isLoggedIn = createReducer(false, {
  [authOperations.register.fulfilled]: () => true,
  [authOperations.logIn.fulfilled]: () => true,
  [authOperations.logOut.fulfilled]: () => false,
  [authOperations.checkCurrentUser.fulfilled]: () => true,
});

const isLogging = createReducer(false, {
  [authOperations.checkCurrentUser.pending]: () => true,
  [authOperations.checkCurrentUser.fulfilled]: () => false,
  [authOperations.checkCurrentUser.rejected]: () => false,
});

const isLoading = createReducer(false, {
  [authOperations.register.pending]: () => true,
  [authOperations.register.fulfilled]: () => false,
  [authOperations.register.rejected]: () => false,

  [authOperations.logIn.pending]: () => true,
  [authOperations.logIn.fulfilled]: () => false,
  [authOperations.logIn.rejected]: () => false,

  [authOperations.logOut.pending]: () => true,
  [authOperations.logOut.fulfilled]: () => false,
  [authOperations.logOut.rejected]: () => false,
});

const error = createReducer(null, {
  [authOperations.register.rejected]: (_, action) => action.payload,
  [authOperations.logIn.rejected]: (_, action) => action.payload,
  [authOperations.logOut.rejected]: (_, action) => action.payload,
  [authOperations.checkCurrentUser.rejected]: (_, action) => action.payload,

  [authOperations.register.pending]: () => null,
  [authOperations.logIn.pending]: () => null,
  [authOperations.logOut.pending]: () => null,
  [authOperations.checkCurrentUser.pending]: () => null,

  [actions.resetError]: () => null,
});

export default combineReducers({
  user,
  token,
  isLoggedIn,
  isLogging,
  isLoading,
  error,
});