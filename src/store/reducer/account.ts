import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionCheckConnexion, actionCheckSignin, actionCheckSignup, actionCheckToken } from '../thunks/checkLogin';
import { validateEmail, validePassword } from '../../utils/regexValidator';
import { disconnectLocalStorage } from '../../localStorage/localStorage';
import { changeCredentialsPayload } from '../../@types/payload';
import { actionAddAddressFromAccount, actionDeleteAccount, actionDeleteAddressFromAccount, actionUpdateAddressFromAccount, actionUpdateInfosFromAccount } from '../thunks/checkAccount';
import { CheckProfileAddressI, CountryI } from '../../@types/account';

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
    id: null as null | number,
    email: '',
    firstname: '',
    lastname: '',
    address: {
      id: null,
      account_id: null,
      default: false,
      firstname: '',
      lastname: '',
      entreprise: '',
      address: '',
      precision: '',
      postal_code: '',
      city: '',
      country_id: '',
      country: {
        id: null as null | number,
        name: '',
        code: '',
        dial_code: '',
      },
      phone: '',
    },
    listAddress: [] as CheckProfileAddressI[],
  },
  connection: 'checking',
  token: null as null | string,
  tokenIsLoading: false,
  initialCheck: true,
  listCountries: [] as CountryI[],
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
      state.account.id = action.payload.data.account.id;
      state.account.email = action.payload.data.account.email;
      state.account.firstname = action.payload.data.account.firstname;
      state.account.lastname = action.payload.data.account.lastname;
      state.account.listAddress = action.payload.data.account.addresses;
      state.listCountries = action.payload.data.listCountries;
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
        state.account.id = action.payload.data.id;
        state.account.email = action.payload.data.email;
        state.account.firstname = action.payload.data.firstname;
        state.account.lastname = action.payload.data.lastname;
        state.account.listAddress = action.payload.data.addresses;
        state.listCountries = action.payload.data.listCountries;
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
    builder.addCase(actionAddAddressFromAccount.fulfilled, (state, action) => {
      state.account.listAddress = action.payload;
    });
    builder.addCase(actionDeleteAddressFromAccount.fulfilled, (state, action) => {
      const id = action.payload;
      state.account.listAddress = state.account.listAddress.filter((address) => address.id !== id);
    });
    builder.addCase(actionUpdateAddressFromAccount.fulfilled, (state, action) => {
      state.account.listAddress = action.payload;
    });
    builder.addCase(actionUpdateInfosFromAccount.fulfilled, (state, action) => {
      state.account.email = action.payload.email;
      state.account.firstname = action.payload.firstname;
      state.account.lastname = action.payload.lastname;
    });
    builder.addCase(actionDeleteAccount.fulfilled, (state) => {
      state.isAuthentificated = false;
      state.token = null;
      disconnectLocalStorage();
    });
  },
});


export const { actionChangeCredentials, actionChangeConnection, actionChangeAuthentification, actionLogOut } = accountSlice.actions;
export default accountSlice.reducer;
