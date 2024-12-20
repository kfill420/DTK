import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';

const actionCheckSignup = createAsyncThunk(
  'account/CHECK_SIGNUP',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await axiosInstance.post('/signup', {
        email: state.account.credentials.signup.email,
        password: state.account.credentials.signup.password,
        confirmPassword: state.account.credentials.signup.passwordConfirm,
        firstname: state.account.credentials.signup.firstname,
        lastname: state.account.credentials.signup.lastname,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export default actionCheckSignup;
