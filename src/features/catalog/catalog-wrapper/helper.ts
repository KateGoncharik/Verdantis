export const encodeCategoryKey = (key: string): string => {
  return key.replace(' ', '_');
};

export const decodeCategoryKey = (key: string): string => {
  return key.replace('_', ' ');
};
