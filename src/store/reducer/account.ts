import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionCheckConnexion, actionCheckSignin, actionCheckSignup, actionCheckToken } from '../thunks/checkLogin';
import { validateEmail, validePassword } from '../../utils/regexValidator';
import { disconnectLocalStorage } from '../../localStorage/localStorage';
import { changeCredentialsPayload } from '../../@types/payload';

export const initialState = {
  id: null,
  isAuthentificated: false,
  credentials: {
    email: '',
    passwordSignin: '',
    password: '',
    passwordConfirm: '',
    formConnection: false,
    formLogin: false,
    formSignup1: false,
    formSignup2: false,
    errorSignup: null as string | string[] | null,
    errorSigin: null as string | string[] | null,
  },
  account: {
    email: '',
    firstname: '',
    lastname: '',
    address: {
      default: false,
      firstname: '',
      lastname: '',
      entreprise: '',
      address: '',
      precision: '',
      postal_code: '',
      city: '',
      country: '',
      phone: '',
    },
  },
  connection: 'checking',
  token: null as null | string,
  tokenIsLoading: false,
  initialCheck: true,
};

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
          state.credentials.errorSignup = "Email invalide";
        } else {
          state.credentials.formConnection = true;
          state.credentials.errorSignup = null;
        }
      }
      if (name === 'password') {
        const testPassword = validePassword(state.credentials.password);
        if (testPassword.length > 0) {
          state.credentials.formSignup1 = false;
          state.credentials.errorSignup = testPassword;
        } else {
          state.credentials.formSignup1 = true;
          state.credentials.errorSignup = null;
        }
      }
      if (name === 'passwordConfirm') {
        if (state.credentials.password !== state.credentials.passwordConfirm) {
          state.credentials.formSignup2 = false;
          state.credentials.errorSignup = ["Les mots de passe ne correspondent pas"];
        } else {
          state.credentials.formSignup2 = true;
          state.credentials.errorSignup = null;
        }
      }
    },
    actionChangeConnection: (state, action) => {
      state.connection = action.payload;
    },
    actionChangeAuthentification: (state, action) => {
      state.isAuthentificated = action.payload;
    },
    actionLogOut: (state) => {
      state.isAuthentificated = false;
      state.token = null;
      disconnectLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionCheckConnexion.fulfilled, (state, action) => {
      if (action.payload.exists === false)
        state.connection = 'signup';
      else
        state.connection = 'login';
    });
    builder.addCase(actionCheckSignin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthentificated = true;
      state.account.email = action.payload.data.email;
      state.account.firstname = action.payload.data.firstname;
      state.account.lastname = action.payload.data.lastname;
      state.account.address = action.payload.data.address;
      state.credentials.errorSignup = null;
      state.credentials.passwordSignin = '';
      state.credentials.password = '';
      state.credentials.passwordConfirm = '';
    });
    builder.addCase(actionCheckSignin.rejected, (state, action) => {
      const payload = action.payload as { error: string };
      state.credentials.errorSignup = payload.error;
      state.isAuthentificated = false;
    });
    builder.addCase(actionCheckSignup.fulfilled, (state) => {
      state.connection = 'checking';
      state.credentials.errorSignup = null;
    });
    builder.addCase(actionCheckToken.fulfilled, (state, action) => {
      state.isAuthentificated = action.payload.valid;
      state.tokenIsLoading = false;
      state.initialCheck = false;
      if (action.payload.valid === true) {
        state.account.email = action.payload.data.email;
        state.account.firstname = action.payload.data.firstname;
        state.account.lastname = action.payload.data.lastname;
        state.account.address = action.payload.data.address;
      }
    });
    builder.addCase(actionCheckToken.pending, (state) => {
      state.tokenIsLoading = true;
    });
    builder.addCase(actionCheckToken.rejected, (state) => {
      state.tokenIsLoading = false;
      state.isAuthentificated = false;
      state.initialCheck = false;
    });
  },
});


export const { actionChangeCredentials, actionChangeConnection, actionChangeAuthentification, actionLogOut } = accountSlice.actions;
export default accountSlice.reducer;
