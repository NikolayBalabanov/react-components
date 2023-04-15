import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/UI/Loader';
import MovieCard from '../components/Movie/MovieCard';
import Select from '../components/UI/Select/Select';
import EmptyResult from '../components/EmptyResult';
import ErrorMessage from '../components/ErrorMessage';
import { EMoviesFilter } from '../types/EMoviesFilter';
import { setSearch } from '../redux/slices/searchSlice';
import { SearchForm } from '../components/Search/SearchForm';
import { PaginationBoard } from '../components/PaginationBoard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getMovies, searchMovies } from '../redux/ac/movies.ac';
import { selectFieldsMovies } from '../types/selectFieldsMovies';

export const MainPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const searchMovie = searchParams.get('search-movie') || '';
  const filterQuery = searchParams.get('filter') || EMoviesFilter.popular;
  const { movies, isLoading, error, totalPages } = useAppSelector((store) => store.moviesSlice);
  const dispatch = useAppDispatch();
  const handlePaginate = (event: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };
  const moviesCards = movies.map((movie) => <MovieCard movie={movie} key={movie.id} />);
  useEffect(() => {
    if (searchMovie) {
      dispatch(searchMovies({ query: searchMovie, page: +page }));
      dispatch(setSearch(searchMovie));
    } else {
      dispatch(getMovies({ query: filterQuery, page: +page }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovie, page, filterQuery]);
  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl pt-5 flex gap-4 justify-around items-center sm:flex-row flex-col">
        <SearchForm placeholder="Search a movie..." mode="search-movie" />
        <Select selectFields={selectFieldsMovies} />
      </div>
      <div>
        {error && <ErrorMessage content={error} />}
        {isLoading && <Loader />}
        {movies.length > 0 && (
          <ul className="grid grid-flow-row gap-2 xl:grid-cols-6 md:grid-cols-4 p-4 sm:grid-cols-3 grid-cols-2">
            {moviesCards}
          </ul>
        )}
        {!isLoading && movies.length === 0 && !error && <EmptyResult />}
      </div>
      {movies.length !== 0 && (
        <PaginationBoard onPaginate={handlePaginate} page={+page} totalPages={totalPages} />
      )}
    </div>
  );
};
