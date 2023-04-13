import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMovieActor } from '../../models/actor';
import { IDetailedMovie } from '../../models/movie';
import { getMovie, getMovieActors, getMovieTrailer } from '../../redux/ac/movie.ac';

export interface IMovieState {
  movie: IDetailedMovie | null;
  movieActors: IMovieActor[];
  trailerLink: string;
  isLoading: boolean;
  movieActorsError: string;
  trailerLinkError: string;
  movieError: string;
}

export const initialMovieState: IMovieState = {
  movie: null,
  movieActors: [],
  trailerLink: '',
  isLoading: false,
  movieActorsError: '',
  trailerLinkError: '',
  movieError: '',
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState: initialMovieState,
  reducers: {},
  extraReducers: {
    [getMovie.fulfilled.type]: (state, action: PayloadAction<IDetailedMovie>) => {
      state.isLoading = false;
      state.movieError = '';
      state.movie = action.payload;
    },
    [getMovie.pending.type]: (state) => {
      state.isLoading = true;
      state.movie = null;
    },
    [getMovie.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.movieError = action.payload;
    },
    [getMovieActors.fulfilled.type]: (state, action: PayloadAction<IMovieActor[]>) => {
      state.movieActors = action.payload;
    },
    [getMovieActors.pending.type]: (state) => {
      state.movieActors = [];
    },
    [getMovieActors.rejected.type]: (state, action: PayloadAction<string>) => {
      state.movieActorsError = action.payload;
    },
    [getMovieTrailer.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.trailerLink = action.payload;
    },
    [getMovieTrailer.pending.type]: (state) => {
      state.trailerLink = '';
    },
    [getMovieTrailer.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.trailerLinkError = action.payload;
    },
  },
});

export default movieSlice.reducer;
