export const isValidEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const splitCamelCaseAndRemoveScreen = (str: string) => {
  // Remove the word "Screen" if it exists
  let cleanedString = str.replace(/Screen/g, '');
  // Split camelCase into words
  return cleanedString.replace(/([A-Z])/g, ' $1').trim();
};
