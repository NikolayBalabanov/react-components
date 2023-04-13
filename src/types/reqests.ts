import { IMovie } from '../models/movie';

export interface IMoviesRequestProps {
  query: string;
  page: number;
}

export interface IMoviesResponse {
  totalPages: number;
  movies: IMovie[];
}
