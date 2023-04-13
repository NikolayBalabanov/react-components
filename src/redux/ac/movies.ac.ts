import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movie';
import MoviesService from '../../API/MoviesService';
import { IMoviesRequestProps } from '../../types/reqests';

export const getMovies = createAsyncThunk(
  'movies/fetchByFilter',
  async ({ query, page }: IMoviesRequestProps, thunkAPI) => {
    try {
      const res = await MoviesService.getPopular(query, page);
      const movies: IMovie[] = res.data.results;
      const totalPages: number = res.data.total_pages;
      return { totalPages: totalPages < 501 ? totalPages : 500, movies };
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred while downloading movies');
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page }: IMoviesRequestProps, thunkAPI) => {
    try {
      const res = await MoviesService.searchMovie(query, page);
      const movies: IMovie[] = res.data.results;
      const totalPages: number = res.data.total_pages;
      return { totalPages: totalPages < 501 ? totalPages : 500, movies };
    } catch (error) {
      return thunkAPI.rejectWithValue('An error occurred while searching movies');
    }
  }
);
