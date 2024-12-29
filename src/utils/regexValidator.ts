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
  console.log(postalCodeRegex.test(postalCode));

  return postalCodeRegex.test(postalCode);
}

export const isNumeric = (text: string): boolean => {
  const regex = /^\d+$/;
  return regex.test(text);
}