import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionCheckConnexion } from '../thunks/checkLogin';
import { validateEmail, validePassword } from '../../utils/regexValidator';

export const initialState = {
  id: null,
  logged: false,
  credentials: {
    email: '',
    passwordSignin: '',
    password: '',
    passwordConfirm: '',
    formConnection: false,
    formLogin: false,
    formSignup1: false,
    formSignup2: false,
  },
  connection: 'checking',
  pseudo: null,
  token: null,
  error: null as string | string[] | null,
};

interface changeCredentialsPayload {
  name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin';
  value: string;
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    actionChangeCredentials: (state, action: PayloadAction<changeCredentialsPayload>) => {
      const { name, value } = action.payload;
      state.credentials[name] = value;
      if (name === 'email') {
        if (!validateEmail(state.credentials.email)) {
          state.credentials.formConnection = false;
          state.error = "Email invalide";
        } else {
          state.credentials.formConnection = true;
          state.error = null;
        }
      }
      if (name === 'password') {
        const testPassword = validePassword(state.credentials.password);
        console.log(testPassword);

        if (testPassword.length > 0) {
          state.credentials.formSignup1 = false;
          state.error = testPassword;
        } else {
          state.credentials.formSignup1 = true;
          state.error = null;
        }
      }
      if (name === 'passwordConfirm') {
        if (state.credentials.password !== state.credentials.passwordConfirm) {
          state.credentials.formSignup2 = false;
          state.error = ["Les mots de passe ne correspondent pas"];
        } else {
          state.credentials.formSignup2 = true;
          state.error = null;
        }
      }
    },
    actionChangeConnection: (state, action) => {
      state.connection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionCheckConnexion.fulfilled, (state, action) => {
      if (action.payload.exists === false)
        state.connection = 'signup';
      else
        state.connection = 'login';
    });
  },
});


export const { actionChangeCredentials, actionChangeConnection } = accountSlice.actions;
export default accountSlice.reducer;
