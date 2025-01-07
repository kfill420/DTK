import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateModal, modal_setIsOpen, setPriceValuePayload } from '../../@types/payload';

export const initialState: initialStateModal = {
  burgerModalIsOpen: false,
  confirmModalIsOpen: false,
  modalCollectionFilterIsOpen: false,
  modalCollectionFilter: {
    initialMinPrice: 0,
    initialMaxPrice: 1000,
    sliderMinValue: 0,
    sliderMaxValue: 1000,
    minVal: 0,
    maxVal: 1000,
    minInput: 0,
    maxInput: 1000,
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
    setPriceValue: (state, action: PayloadAction<setPriceValuePayload>) => {
      const { name, value } = action.payload;
      if (name === 'isDraging' || name === 'filtered') {
        if (value === true) state.modalCollectionFilter[name] = true;
        else state.modalCollectionFilter[name] = false;
      }
      else if (typeof (value) === "number") {
        state.modalCollectionFilter[name] = value;
      }
    }
  }
})

export const { toggleIsOpen, setIsOpen, setPriceValue } = ModalMenu.actions;
export default ModalMenu.reducer;
