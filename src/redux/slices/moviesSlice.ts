import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movie';
import { IMoviesResponse } from '../../types/reqests';
import { getMovies, searchMovies } from '../../redux/ac/movies.ac';

export interface IMoviesState {
  movies: IMovie[];
  isLoading: boolean;
  totalPages: number;
  error: string;
}

export const initialMoviesState: IMoviesState = {
  movies: [],
  error: '',
  totalPages: 0,
  isLoading: false,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMoviesState,
  reducers: {},
  extraReducers: {
    [getMovies.fulfilled.type]: (state, action: PayloadAction<IMoviesResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    [getMovies.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getMovies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [searchMovies.fulfilled.type]: (state, action: PayloadAction<IMoviesResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.movies = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    },
    [searchMovies.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchMovies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default moviesSlice.reducer;
