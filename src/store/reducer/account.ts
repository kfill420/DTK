import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  actionCheckConnexion,
  actionCheckSignin,
  actionCheckSignup,
  actionCheckToken,
  actionLogout
} from '../thunks/checkLogin';
import { validateEmail, validePassword } from '../../utils/regexValidator';
import { deleteLocalStorage } from '../../localStorage/localStorage';
import { changeCredentialsPayload } from '../../@types/payload';
import {
  actionAddAddressFromAccount,
  actionDeleteAccount,
  actionDeleteAddressFromAccount,
  actionUpdateAddressFromAccount,
  actionUpdateInfosFromAccount
} from '../thunks/checkAccount';
import { CheckProfileAddressI, CountryI } from '../../@types/account';
import { escapeHtml } from '../../utils/escapeHtml';
import { actionAddToCart, actionDeleteOneFromCart } from "../thunks/checkCart";

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
  listCountries: [] as CountryI[],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    actionChangeCredentials: (state, action: PayloadAction<changeCredentialsPayload>) => {
      const { name, value } = action.payload;
      state.credentials[name] = escapeHtml(value);
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
  },
  extraReducers: (builder) => {
    builder.addCase(actionCheckConnexion.fulfilled, (state, action) => {
      if (action.payload.exists === false)
        state.connection = 'signup';
      else
        state.connection = 'login';
    });
    builder.addCase(actionCheckSignin.fulfilled, (state, action) => {
      state.token = action.payload.data.token;
      state.isAuthentificated = true;
      state.account.id = action.payload.data.account.id;
      state.account.email = escapeHtml(action.payload.data.account.email);
      if (action.payload.data.account.firstname) state.account.firstname = escapeHtml(action.payload.data.account.firstname);
      if (action.payload.data.account.lastname) state.account.lastname = escapeHtml(action.payload.data.account.lastname);
      state.account.listAddress = action.payload.data.account.addresses.map((address: CheckProfileAddressI) => ({
        ...address,
        firstname: escapeHtml(address.firstname),
        lastname: escapeHtml(address.lastname),
        entreprise: escapeHtml(address.entreprise),
        address: escapeHtml(address.address),
        precision: escapeHtml(address.precision),
        postal_code: escapeHtml(address.postal_code),
        city: escapeHtml(address.city),
        phone: escapeHtml(address.phone),
        country: {
          ...address.country,
          name: escapeHtml(address.country.name),
          code: escapeHtml(address.country.code),
          dial_code: escapeHtml(address.country.dial_code)
        }
      }));
      state.listCountries = action.payload.data.listCountries.map((country: CountryI) => ({
        ...country,
        name: escapeHtml(country.name),
        code: escapeHtml(country.code),
        dial_code: escapeHtml(country.dial_code)
      }));
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
      if (action.payload.valid) {
        state.account.id = action.payload.data.id;
        state.account.email = escapeHtml(action.payload.data.email);
        if (action.payload.data.firstname) state.account.firstname = escapeHtml(action.payload.data.firstname);
        if (action.payload.data.lastname) state.account.lastname = escapeHtml(action.payload.data.lastname);
        state.account.listAddress = action.payload.data.addresses.map((address: CheckProfileAddressI) => ({
          ...address,
          firstname: escapeHtml(address.firstname),
          lastname: escapeHtml(address.lastname),
          entreprise: escapeHtml(address.entreprise),
          address: escapeHtml(address.address),
          precision: escapeHtml(address.precision),
          postal_code: escapeHtml(address.postal_code),
          city: escapeHtml(address.city),
          phone: escapeHtml(address.phone),
          country: {
            ...address.country,
            name: escapeHtml(address.country.name),
            code: escapeHtml(address.country.code),
            dial_code: escapeHtml(address.country.dial_code)
          }
        }));
        state.listCountries = action.payload.data.listCountries.map((country: CountryI) => ({
          ...country,
          name: escapeHtml(country.name),
          code: escapeHtml(country.code),
          dial_code: escapeHtml(country.dial_code)
        }));
      }
    });
    builder.addCase(actionCheckToken.rejected, (state, action) => {
      state.isAuthentificated = false;
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
      }
    });
    builder.addCase(actionAddAddressFromAccount.fulfilled, (state, action) => {
      state.account.listAddress = action.payload.map(address => ({
        ...address,
        firstname: escapeHtml(address.firstname),
        lastname: escapeHtml(address.lastname),
        entreprise: escapeHtml(address.entreprise),
        address: escapeHtml(address.address),
        precision: escapeHtml(address.precision),
        postal_code: escapeHtml(address.postal_code),
        city: escapeHtml(address.city),
        phone: escapeHtml(address.phone),
        country: {
          ...address.country,
          name: escapeHtml(address.country.name),
          code: escapeHtml(address.country.code),
          dial_code: escapeHtml(address.country.dial_code)
        }
      }));
    });
    builder.addCase(actionAddAddressFromAccount.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
    builder.addCase(actionDeleteAddressFromAccount.fulfilled, (state, action) => {
      const id = action.payload;
      state.account.listAddress = state.account.listAddress.filter((address) => address.id !== id);
    });
    builder.addCase(actionDeleteAddressFromAccount.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
    builder.addCase(actionUpdateAddressFromAccount.fulfilled, (state, action) => {
      state.account.listAddress = action.payload.map(address => ({
        ...address,
        firstname: escapeHtml(address.firstname),
        lastname: escapeHtml(address.lastname),
        entreprise: escapeHtml(address.entreprise),
        address: escapeHtml(address.address),
        precision: escapeHtml(address.precision),
        postal_code: escapeHtml(address.postal_code),
        city: escapeHtml(address.city),
        phone: escapeHtml(address.phone),
        country: {
          ...address.country,
          name: escapeHtml(address.country.name),
          code: escapeHtml(address.country.code),
          dial_code: escapeHtml(address.country.dial_code)
        }
      }));
    });
    builder.addCase(actionUpdateAddressFromAccount.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
    builder.addCase(actionUpdateInfosFromAccount.fulfilled, (state, action) => {
      state.account.email = action.payload.email;
      state.account.firstname = action.payload.firstname;
      state.account.lastname = action.payload.lastname;
    });
    builder.addCase(actionUpdateInfosFromAccount.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
    builder.addCase(actionDeleteAccount.fulfilled, (state) => {
      state.isAuthentificated = false;
      state.token = null;
      deleteLocalStorage();
    });
    builder.addCase(actionLogout.fulfilled, (state) => {
      state.isAuthentificated = false;
      state.token = null;
      deleteLocalStorage();
    });
    builder.addCase(actionAddToCart.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
    builder.addCase(actionDeleteOneFromCart.rejected, (state, action) => {
      if (action.payload?.tokenExpired && action.payload?.tokenExpired === true) {
        state.token = null;
        deleteLocalStorage();
        state.isAuthentificated = false;
      }
    });
  },
});


export const { actionChangeCredentials, actionChangeConnection, actionChangeAuthentification } = accountSlice.actions;
export default accountSlice.reducer;
