import * as api from '../../services/api';

import { createAsyncThunk } from '@reduxjs/toolkit';

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      return await api.registerUser(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await api.loginUser(credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.logOutUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const checkCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    try {
      return await api.CheckCurrentUser(persistedToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  checkCurrentUser,
};
export default operations;