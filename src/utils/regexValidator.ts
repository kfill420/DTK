const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
const nameRegex = /^[a-zA-Z0-9._-]{3,}$/;
const postalCodeRegex = /^[0-9]{5}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une lettre minuscule.");
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une lettre majuscule.");
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un chiffre.");
  }

  if (!/(?=.*[\W_])/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un caractère spécial.");
  }

  if (!/[A-Za-z\d\W_]{8,}/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères.");
  }

  return errors;
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