import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: null,
  logged: false,
  credentials: {
    login: {
      emailSignin: '',
      passwordSignin: '',
    },
    signup: {
      email: '',
      password: '',
      passwordConfirm: '',
      firstname: '',
      lastname: '',
    },
  },
  pseudo: null,
  token: null,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state, action) => {
      state.logged = true;
      state.credentials = action.payload.credentials;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.logged = false;
      state.token = null;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
  }
})

export const { login, logout, error } = accountSlice.actions;
export default accountSlice.reducer;
