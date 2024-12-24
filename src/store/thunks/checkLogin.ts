import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { addTokenAndPseudoToLocalStorage } from '../../localStorage/localStorage';

const actionCheckLogin = createAsyncThunk(
  'account/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/login', {
      email: state.account.credentials.email,
      password: state.account.credentials.passwordSignin,
    });

    const { token } = response.data;
    addTokenJwtToAxiosInstance(token);
    addTokenAndPseudoToLocalStorage(token);

    return { token, account: response.data.data.account };
  }
);

const actionCheckSignup = createAsyncThunk(
  'account/CHECK_SIGNUP',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/signup', {
      email: state.account.credentials.email,
      password: state.account.credentials.password,
    });
    return response.data;
  }
);

const actionCheckConnexion = createAsyncThunk(
  'account/CHECK_CONNEXION',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/connexion', {
      email: state.account.credentials.email,
    });
    return response.data;
  }
);

export { actionCheckLogin, actionCheckConnexion, actionCheckSignup };
