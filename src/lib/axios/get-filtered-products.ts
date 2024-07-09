export const buildQueryString = (params: IterableIterator<[string, string]>): string => {
  const result: string[] = [];
  for (const [key, value] of params) {
    if (key === 'color' && value) {
      const colors = value.split('-');
      colors.forEach((color) => {
        result.push(`filter=variants.attributes.${key}:"${color}"`);
      });
    } else if (key === 'category' && value) {
      result.push(value);
    } else if (key === 'size' && value) {
      result.push(`filter=variants.attributes.${encodeURIComponent(key)}:"${encodeURIComponent(value)}"`);
    } else if (key === 'sort' && value) {
      const formattedSort = value.split('-').join(' ');
      result.push(`${key}=${formattedSort}`);
    } else if (key === 'q' && value) {
      result.push('fuzzy=true');
      result.push(`text.en="${value}"`);
    }
  }
  return result.join('&');
};
