export const excludeKeyInObject = (object, keys) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key)),
  );
};
