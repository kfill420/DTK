import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateModal, modal_setIsOpen, setPriceValuePayload } from '../../@types/payload';

export const initialState: initialStateModal = {
  burgerModalIsOpen: false,
  confirmModalIsOpen: false,
  modalCollectionFilterIsOpen: false,
  modalCollectionFilter: {
    available: true,

    initialMinPrice: 0,
    initialMaxPrice: 1000,
    sliderMinValue: 0,
    sliderMaxValue: 1000,
    minVal: 0,
    maxVal: 1000,
    minInput: '',
    maxInput: '',
    selectedMinPrice: 0,
    selectedMaxPrice: 1000,
    isDraging: false,
    filtered: false,
    minGap: 5,
  }
}

const ModalMenu = createSlice({
  name: 'modalMenu',
  initialState,
  reducers: {
    toggleIsOpen: (state, action: PayloadAction<'burgerModalIsOpen' | 'confirmModalIsOpen' | 'modalCollectionFilterIsOpen'>) => {
      state[action.payload] = !state[action.payload];
    },
    setIsOpen: (state, action: PayloadAction<modal_setIsOpen>) => {
      state[action.payload.modal] = action.payload.value;
    },
    setFilterValue: (state, action: PayloadAction<setPriceValuePayload>) => {
      const { name, value } = action.payload;
      if (typeof (value) === "boolean" && (name === 'isDraging' || name === 'filtered' || name === 'available')) {
        if (value === true) state.modalCollectionFilter[name] = true;
        else state.modalCollectionFilter[name] = false;
      }
      else if (typeof (value) === "string" && (name === "minInput" || name === "maxInput")) {
        state.modalCollectionFilter[name] = value;
      }
      else if (typeof (value) === "number" && (name === "initialMinPrice" || name === "initialMaxPrice" || name === "sliderMinValue" || name === "sliderMaxValue" || name === "minVal" || name === "maxVal" || name === "selectedMinPrice" || name === "selectedMaxPrice" || name === "minGap")) {
        state.modalCollectionFilter[name] = value;
      }
    }
  }
})

export const { toggleIsOpen, setIsOpen, setFilterValue } = ModalMenu.actions;
export default ModalMenu.reducer;
