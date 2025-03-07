import accountSlice from './account';
import modalMenuSlice from './modal';
import productSlice from './product';
import cartSlice from './cart';
import orderSlice from './order';
import discountSlice from "./discount";
import waitingUsersSlice from "./waitingUsers";

const reducer = {
  account: accountSlice,
  ModalMenu: modalMenuSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  discount: discountSlice,
  waitingUsers: waitingUsersSlice,
};

export default reducer;