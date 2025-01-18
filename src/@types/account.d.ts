export interface ProductStateI {
  address: AddressI[];
}

export interface AccountI {
  account: {
    id: null | number;
    email: string;
    firstname: string;
    lastname: string;
    address: CheckProfileAddressI;
    listAddress: CheckProfileAddressI[];
  }
}

export interface AccountSigninI {
  id: null | number;
  email: string;
  firstname: string;
  lastname: string;
  address: CheckProfileAddressI;
  addresses: CheckProfileAddressI[];
}

export type AddressI = {
  default: boolean,
  firstname: string,
  lastname: string,
  entreprise: string,
  address: string,
  precision: string,
  postal_code: string,
  city: string,
  country_id: string,
  country_name: string,
  phone: string,
};

export type CountryI = {
  id: number | null,
  name: string,
  code: string,
  dial_code: string,
};

export type CheckProfileAddressI = {
  id: number | null,
  account_id: number | null,
  default: boolean,
  firstname: string,
  lastname: string,
  entreprise: string,
  address: string,
  address: string,
  precision: string,
  postal_code: string,
  city: string,
  country: CountryI,
  phone: string,
};

export type CheckProfileAddressHandleModifyI = {
  id: number | null,
  account_id: number | null,
  default: boolean,
  firstname: string,
  lastname: string,
  entreprise: string,
  address: string,
  address: string,
  precision: string,
  postal_code: string,
  city: string,
  country_id: string,
  country_name: string,
  phone: string,
};

export type CheckProfileInfosI = {
  email: string,
  firstname: string,
  lastname: string,
};

export type updateInfosPayload = {
  email: string,
  firstname: string,
  lastname: string,
  account_id: number | null,
};

// export type addAddressToAccountResultI = {
//   newAddress: CheckProfileAddressI;
//   country: CountryI;
// };

export type updateMailFormAccountResultI = {
  account_id: number;
  email: string;
};