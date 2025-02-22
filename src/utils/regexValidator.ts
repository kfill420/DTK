const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
const nameRegex = /^[a-zA-Z0-9._-]{3,}$/;
const postalCodeRegex = /^[0-9]{5}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

interface validePasswordI {
  caractMini8: boolean,
  minuscule: boolean,
  majuscule: boolean,
  chiffre: boolean,
  special: boolean,
}

export const validePassword = (password: string): validePasswordI => {
  // const errors: string[] = [];
  const errorsSignup = {
    caractMini8: false,
    minuscule: false,
    majuscule: false,
    chiffre: false,
    special: false,
  }

  if (/[A-Za-z\d\W_]{8,}/.test(password))
    errorsSignup.caractMini8 = true;
  else errorsSignup.caractMini8 = false;

  if (/(?=.*[a-z])/.test(password))
    errorsSignup.minuscule = true;
  else errorsSignup.minuscule = false;

  if (/(?=.*[A-Z])/.test(password))
    errorsSignup.majuscule = true;
  else errorsSignup.majuscule = false;

  if (/(?=.*\d)/.test(password))
    errorsSignup.chiffre = true;
  else errorsSignup.chiffre = false;

  if (/(?=.*[\W_])/.test(password))
    errorsSignup.special = true;
  else errorsSignup.special = false;

  return errorsSignup;
};

export const valideName = (name: string): boolean => {
  return nameRegex.test(name);
};

export const validePostalCode = (postalCode: string): boolean => {
  return postalCodeRegex.test(postalCode);
}

export const isNumeric = (text: string): boolean => {
  const regex = /^\d+$/;
  return regex.test(text);
}

export const isCreditCard = (text: string): boolean => {
  const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return creditCardRegex.test(text);
}

export const isExpirationDate = (text: string): boolean => {
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return expirationDateRegex.test(text);
}

export const isCvv = (text: string): boolean => {
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(text);
}