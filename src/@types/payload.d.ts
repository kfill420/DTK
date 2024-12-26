export interface changeCredentialsPayload {
  name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin';
  value: string;
}

// export interface changeCredentialsPayloadSignin {
//   token: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   address: AddressI;
// }

// export type AddressI = {
//   default: boolean,
//   firstname: string,
//   lastname: string,
//   entreprise: string,
//   address: string,
//   precision: string,
//   postal_code: string,
//   city: string,
//   country: string,
//   phone: string,
// };