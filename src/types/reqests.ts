import { IMovie } from '../models/movie';

export interface IMoviesRequestProps {
  query: string;
  page: number;
  type: 'search' | 'filter';
}

export interface IMoviesResponse {
  totalPages: number;
  movies: IMovie[];
}
