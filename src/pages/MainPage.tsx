import { Product } from '../components/Product';
import React, { FC, useEffect, useRef, useState } from 'react';
import data from '../assets/data.json';
import { SearchForm } from '../components/SearchForm';
import { useFetching } from '../hooks/useFetching';
import MoviesService from '../API/MoviesService';
import { IMovie } from '../models/movie';
import MovieCard from '../components/MovieCard';

export const MainPage: FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState<string>(localStorage.getItem('input') ?? '');
  const [fetchPosts, isPostsLoading, fetchError] = useFetching(async () => {
    const response = await MoviesService.getPopular();
    console.log('response', response);
    setMovies(response.data.results as IMovie[]);
  });
  useEffect(() => {
    if (typeof fetchPosts === 'function') {
      fetchPosts();
    }
  }, []);
  return (
    <div className="container mx-auto ">
      <SearchForm onFormSubmit={(str) => setSearch(str)} />
      <div>
        <ul className="grid grid-flow-row gap-4 lg:grid-cols-4 p-4 sm:grid-cols-2 grid-cols-1">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
