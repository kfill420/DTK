import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { addTokenAndPseudoToLocalStorage } from '../../localStorage/localStorage';
import { AxiosError } from 'axios';

const actionCheckToken = createAsyncThunk(
  'account/CHECK_TOKEN',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { valid: false };
      }
      addTokenJwtToAxiosInstance(token);
      const response = await axiosInstance.post('/valide-token');

      return { valid: response.data.valid, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionCheckSignin = createAsyncThunk(
  'account/CHECK_LOGIN',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.post('/signin', {
        email: state.account.credentials.email,
        password: state.account.credentials.passwordSignin,
      });

      const { token } = response.data;
      addTokenJwtToAxiosInstance(token);
      addTokenAndPseudoToLocalStorage(token);
      return { token, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionCheckSignup = createAsyncThunk(
  'account/CHECK_SIGNUP',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.post('/signup', {
        email: state.account.credentials.email,
        password: state.account.credentials.password,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionCheckConnexion = createAsyncThunk(
  'account/CHECK_CONNEXION',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.post('/connexion', {
        email: state.account.credentials.email,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export { actionCheckSignin, actionCheckConnexion, actionCheckSignup, actionCheckToken };
