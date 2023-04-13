import { EMoviesFilter } from '../types/EMoviesFilter';
import { EMoviesFilterText } from '../types/EMoviesFilterText';

export const selectFieldsMovies = [
  { value: EMoviesFilter.popular, text: EMoviesFilterText.popular },
  { value: EMoviesFilter.nowPlaying, text: EMoviesFilterText.nowPlaying },
  { value: EMoviesFilter.topRated, text: EMoviesFilterText.topRated },
  { value: EMoviesFilter.upcoming, text: EMoviesFilterText.upcoming },
];

export type TSelectFieldsMovies = typeof selectFieldsMovies;
