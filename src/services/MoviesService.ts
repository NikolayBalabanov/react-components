import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IMoviesRequestProps } from '../types/reqests';
import { IMoviesRes } from '../types/responses';

export const moviesAPI = createApi({
  reducerPath: 'moviesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  tagTypes: ['Movies'],
  endpoints: (build) => ({
    moviesByFilter: build.query<IMoviesRes, IMoviesRequestProps>({
      query: ({ page, query, type }) => {
        if (type === 'filter') {
          return {
            url: `movie/${query}`,
            params: {
              page,
              api_key: import.meta.env.VITE_APP_APY_KEY,
            },
          };
        }
        return {
          url: 'search/movie',
          params: {
            page,
            api_key: import.meta.env.VITE_APP_APY_KEY,
            query,
          },
        };
      },
      providesTags: (result) => ['Movies'],
    }),
  }),
});
