export interface changeCredentialsPayload {
  name: 'email' | 'password' | 'passwordConfirm' | 'passwordSignin';
  value: string;
}

export interface modal_setIsOpen {
  modal: 'burgerModalIsOpen' | 'confirmModalIsOpen' | 'modalCollectionFilterIsOpen';
  value: boolean;
}

export interface PriceRangeModal {
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
