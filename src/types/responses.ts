import { IMovieActor } from '../models/actor';
import { IMovie } from '../models/movie';

export interface IMoviesRes {
  total_pages: number;
  results: IMovie[];
  page: number;
}

export interface ITrailerRes {
  id: number;
  results: [{ key: string }];
}

export interface IMovieActorRes {
  cast: IMovieActor[];
}
