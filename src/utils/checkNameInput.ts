export const checkNameInput = (str: string) => {
  return /([A-ZА-Я]{1}[a-zа-я]+)( [A-ZА-Я]{1}[a-zа-я]+)+/.test(str.trim());
};
