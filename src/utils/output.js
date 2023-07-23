export const getStringFromArray = (arr) => arr.join(', ');

export const fixIfEmptyString = (str) => str?.length ? str : 'It\'s a secret';