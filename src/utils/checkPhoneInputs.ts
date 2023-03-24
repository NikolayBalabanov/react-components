export const checkPhoneInput = (str: string) => {
  return /[\+][\d]{9,14}/.test(str.trim());
};
