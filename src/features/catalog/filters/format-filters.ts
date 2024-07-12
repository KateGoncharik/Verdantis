import { FilterValues } from './filters';

type FormattedFiltersForSearchParams = { color?: string; size?: string; sort?: string };

export const formatFilters = ({ selectedColors: color, size, sort }: FilterValues): FormattedFiltersForSearchParams => {
  const selectedColors = Object.keys(color)
    .filter((key) => color[key] === true)
    .join('-');
  const result: { color?: string; size?: string; sort?: string } = {};
  if (size.length > 0) {
    result.size = size;
  }
  if (selectedColors.length > 0) {
    result.color = selectedColors;
  }
  if (sort.length > 0) {
    result.sort = sort;
  }

  return result;
};
