export interface changeCredentialsPayload {
  name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin';
  value: string;
}

export interface modal_setIsOpen {
  modal: 'burgerModalIsOpen' | 'confirmModalIsOpen' | 'modalCollectionFilterIsOpen';
  value: boolean;
}

export interface PriceRangeModal {
  available: boolean;
  initialMinPrice: number;
  initialMaxPrice: number;
  sliderMinValue: number;
  sliderMaxValue: number;
  minVal: number;
  maxVal: number;
  minInput: string;
  maxInput: string;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  isDraging: boolean;
  filtered: boolean;
  minGap: number;
}

export interface initialStateModal {
  burgerModalIsOpen: boolean;
  confirmModalIsOpen: boolean;
  modalCollectionFilterIsOpen: boolean;
  modalCollectionFilter: PriceRangeModal;
}

export interface setPriceValuePayload {
  name: keyof PriceRangeModal;
  value: number | boolean | string;
}

export interface actionCheckTokenPayload {
  valid: boolean;
  data: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    addresses: CheckProfileAddressI[];
    listCountries: CountryI[];
  }

}

export interface ErrorPayload {
  message: string;
  [key: string]: string;
}

export interface ExpirationPayload {
  tokenExpired: boolean;
  message?: string;
}

export type RejectPayload = ExpirationPayload | ErrorPayload;





// export interface stateAnimationPopupPayload {
//   state: 'close' | 'open' | 'open-active' | 'exit' | 'exit-active' | 'exit-end';
// }
