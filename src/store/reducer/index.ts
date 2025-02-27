import accountSlice from './account';
import modalMenuSlice from './modal';
import productSlice from './product';
import cartSlice from './cart';
import discountSlice from "./discount";

const reducer = {
  account: accountSlice,
  ModalMenu: modalMenuSlice,
  product: productSlice,
  cart: cartSlice,
  discount: discountSlice,
};

export default reducer;