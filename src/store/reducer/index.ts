import accountSlice from './account';
import modalMenuSlice from './modal';
import productSlice from './product';
import cartSlice from './cart';

const reducer = {
  account: accountSlice,
  ModalMenu: modalMenuSlice,
  product: productSlice,
  cart: cartSlice,
};

export default reducer;