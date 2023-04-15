import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/UI/Loader';
import MovieCard from '../components/Movie/MovieCard';
import Select from '../components/UI/Select/Select';
import EmptyResult from '../components/EmptyResult';
import ErrorMessage from '../components/ErrorMessage';
import { EMoviesFilter } from '../types/EMoviesFilter';
import { SearchForm } from '../components/Search/SearchForm';
import { PaginationBoard } from '../components/PaginationBoard';
import { selectFieldsMovies } from '../types/selectFieldsMovies';
import { moviesAPI } from '../services/MoviesService';

export const MainPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const searchMovie = searchParams.get('search-movie') || '';
  const filterQuery = searchParams.get('filter') || EMoviesFilter.popular;
  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };
  const { data, isLoading, error } = moviesAPI.useMoviesByFilterQuery({
    page: +page,
    query: searchMovie ? searchMovie : filterQuery,
    type: searchMovie ? 'search' : 'filter',
  });
  const { results, total_pages: totalPages } = data || { results: [], total_pages: 0 };
  const moviesCards = results.map((movie) => <MovieCard movie={movie} key={movie.id} />);
  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl pt-5 flex gap-4 justify-around items-center sm:flex-row flex-col">
        <SearchForm placeholder="Search a movie..." mode="search-movie" />
        <Select selectFields={selectFieldsMovies} />
      </div>
      <div>
        {error && <ErrorMessage content={'An error occurred while downloading movies'} />}
        {isLoading && <Loader />}
        {results.length > 0 && (
          <ul className="grid grid-flow-row gap-2 xl:grid-cols-6 md:grid-cols-4 p-4 sm:grid-cols-3 grid-cols-2">
            {moviesCards}
          </ul>
        )}
        {!isLoading && results.length === 0 && !error && <EmptyResult />}
      </div>
      {results.length !== 0 && (
        <PaginationBoard onPaginate={handlePaginate} page={+page} totalPages={totalPages} />
      )}
    </div>
  );
};
