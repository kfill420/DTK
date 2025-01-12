import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { addTokenAndPseudoToLocalStorage, disconnectLocalStorage } from '../../localStorage/localStorage';
import { AxiosError } from 'axios';
import { escapeHtml } from "../../utils/escapeHtml";
import { checkTokenExpiration } from "../../utils/checkTokenExpiration";
import { actionCheckTokenPayload, RejectPayload } from "../../@types/payload";

const actionCheckToken = createAsyncThunk<actionCheckTokenPayload, void, { rejectValue: RejectPayload }>(
  'account/CHECK_TOKEN',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (checkTokenExpiration() === false)
        return thunkAPI.rejectWithValue({ tokenExpired: true });

      if (token)
        addTokenJwtToAxiosInstance(token);

      const response = await axiosInstance.post('/valide-token');
      return { valid: response.data.valid, data: response.data };
    } catch (error) {
      console.log(error);
      disconnectLocalStorage();
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as RejectPayload);
    }
  }
);

const actionCheckSignin = createAsyncThunk(
  'account/CHECK_LOGIN',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.post('/signin', {
        email: escapeHtml(state.account.credentials.email),
        password: escapeHtml(state.account.credentials.passwordSignin),
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
        email: escapeHtml(state.account.credentials.email),
        password: escapeHtml(state.account.credentials.password),
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
        email: escapeHtml(state.account.credentials.email),
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export { actionCheckSignin, actionCheckConnexion, actionCheckSignup, actionCheckToken };
