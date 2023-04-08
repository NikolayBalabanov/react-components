import React, { FC, useEffect, useState } from 'react';
import { SearchForm } from '../components/SearchForm';
import { useFetching } from '../hooks/useFetching';
import MoviesService from '../API/MoviesService';
import { IMovie } from '../models/movie';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyResult from '../components/EmptyResult';

export const MainPage: FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState<string>(localStorage.getItem('input') ?? '');
  const {
    fetching: fetchPosts,
    isLoading: isPostsLoading,
    error: fetchError,
  } = useFetching(async () => {
    const response = await MoviesService.getPopular();
    setMovies(response.data.results as IMovie[]);
  });
  const {
    fetching: searchedPosts,
    isLoading: isSearchedLoading,
    error: searchedError,
  } = useFetching(async () => {
    const response = await MoviesService.searchMovie(search);
    setMovies(response.data.results as IMovie[]);
  });
  useEffect(() => {
    if (typeof fetchPosts === 'function') {
      fetchPosts();
    }
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
    if (search && typeof searchedPosts === 'function') {
      searchedPosts(search);
    } else {
      if (typeof fetchPosts === 'function') {
        fetchPosts();
      }
    }
  }, [search]);
  return (
    <div className="container mx-auto ">
      <SearchForm onFormSubmit={(str) => setSearch(str)} />
      <div>
        {fetchError && <ErrorMessage content={fetchError} />}
        {searchedError && <ErrorMessage content={searchedError} />}
        {isPostsLoading || isSearchedLoading ? (
          <Loader />
        ) : movies.length > 0 && !(fetchError || searchedError) ? (
          <ul className="grid grid-flow-row gap-4 lg:grid-cols-4 p-4 sm:grid-cols-2 grid-cols-1">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </ul>
        ) : (
          <EmptyResult />
        )}
      </div>
    </div>
  );
};
