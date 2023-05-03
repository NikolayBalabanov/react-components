import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IMovieActorRes, ITrailerRes } from '../types/responses';
import { IDetailedMovie } from '../models/movie';

export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/movie/' }),
  tagTypes: ['Movie', 'Trailer', 'Actors'],
  endpoints: (build) => ({
    getMovie: build.query<IDetailedMovie, number>({
      query: (movieId: number) => ({
        url: `${movieId}`,
        params: {
          api_key: import.meta.env.VITE_APP_APY_KEY,
        },
      }),
      providesTags: () => ['Movie'],
    }),
    getTrailerByMovieId: build.query<ITrailerRes, number>({
      query: (movieId: number) => ({
        url: `${movieId}/videos`,
        params: {
          api_key: import.meta.env.VITE_APP_APY_KEY,
        },
      }),
      providesTags: () => ['Trailer'],
    }),
    getActorsByMovieId: build.query<IMovieActorRes, number>({
      query: (movieId: number) => ({
        url: `${movieId}/credits`,
        params: {
          api_key: import.meta.env.VITE_APP_APY_KEY,
        },
      }),
      providesTags: () => ['Actors'],
    }),
  }),
});
