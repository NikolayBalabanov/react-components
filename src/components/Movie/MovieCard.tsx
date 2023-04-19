import React, { useState } from 'react';
import { IMovie } from '../../models/movie';
import MovieModal from './MovieModal';
import { PLACEHOLDER_IMG } from '../../utils/consts';

interface IMovieCard {
  movie: IMovie;
}

export default function MovieCard({ movie }: IMovieCard) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const movieImg = movie.poster_path
    ? 'https://image.tmdb.org/t/p/original' + movie.poster_path
    : PLACEHOLDER_IMG;
  return (
    <div
      data-test={`testId-${movie.id}`}
      onClick={() => setIsModalOpen(true)}
      className="relative h-full flex flex-col justify-between p-2 md:gap-3 gap-1 group bg-slate-800 shadow-md rounded-lg cursor-pointer"
    >
      <span
        className={`absolute z-10 pointer-events-none -top-1 -right-1 p-1 flex md:w-10 md:h-10 h-6 w-6 items-center justify-center rounded-full 
          ${movie.vote_average > 6 ? 'bg-green-500' : 'bg-red-500 '}`}
      >
        {movie.vote_average.toFixed(1)}
      </span>
      <div className="overflow-hidden h-full rounded-lg relative ">
        <img className="card-img" src={movieImg} alt={movie.title} />
        <span className="absolute bottom-0 left-0 sm:px-4 sm:py-2 py-0 px-2 rounded-md text-center text-gray-100 md:font-black font-normal text-base bg-slate-500">
          {movie.release_date ? movie.release_date.slice(0, 4) : ''}
        </span>
      </div>
      <h3 className="text-center text-gray-200 sm:font-black text-base is-short font-normal ">
        {movie ? movie.original_title : ''}
      </h3>
      {isModalOpen && <MovieModal movieId={movie.id} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
