import { FilterValues } from './filters';

export const formatFilters = ({ color, size, sort }: FilterValues): { color: string; size: string; sort: string } => {
  const selectedColors = Object.keys(color)
    .filter((key) => color[key] === true)
    .join('-');
  const result = { color: '', size: '', sort: '' };
  result.size = size;
  result.color = selectedColors;
  result.sort = sort;

  return result;
};
