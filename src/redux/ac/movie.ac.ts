import { createAsyncThunk } from '@reduxjs/toolkit';
import MoviesService from '../../API/MoviesService';
import { IMovieActor } from '../../models/actor';
import { IDetailedMovie } from '../../models/movie';

export const getMovie = createAsyncThunk('movie/fetchMovie', async (movieId: number, thunkAPI) => {
  try {
    const response = await MoviesService.getMovieById(movieId);
    const movie: IDetailedMovie = response.data;
    return movie;
  } catch (error) {
    return thunkAPI.rejectWithValue('An error occurred while downloading movie');
  }
});

export const getMovieActors = createAsyncThunk(
  'movie/fetchActors',
  async (movieId: number, thunkAPI) => {
    try {
      const response = await MoviesService.getActorsByMovieId(movieId);
      const actorsByMovie: IMovieActor[] = response.data.cast;
      console.log('heey', actorsByMovie);
      return actorsByMovie;
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred while searching movies');
    }
  }
);

export const getMovieTrailer = createAsyncThunk(
  'movie/fetchTrailer',
  async (movieId: number, thunkAPI) => {
    try {
      const response = await MoviesService.getTrailerByMovieId(movieId);
      const trailerLink: string = response.data.results[0]?.key;
      return trailerLink;
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred while downloading trailer link');
    }
  }
);
