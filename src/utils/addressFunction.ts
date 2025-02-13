import { CheckProfileAddressI } from "../@types/account";

export const getDefaultAddress = (listAddress: CheckProfileAddressI[]) => {

  if (typeof (listAddress) !== 'object' || listAddress.length === 0 || !listAddress)
    return null;

  try {
    const defaultAddress = listAddress.find((address) => address.default === true);

    if (!defaultAddress)
      return null;
    else
      return defaultAddress;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const gettAddressExceptDefault = (listAddress: CheckProfileAddressI[]) => {

  if (typeof (listAddress) !== 'object' || listAddress.length === 0 || !listAddress)
    return null;

  try {
    const addresses = listAddress.filter((address) => address.default !== true);

    if (!addresses)
      return null;
    else
      return addresses;
  } catch (error) {
    console.log(error);
    return null;
  }
};