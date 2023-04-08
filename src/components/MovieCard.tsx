import { Link } from 'react-router-dom';
import { IMovie } from '../models/movie';
import React from 'react';

interface IMovieCard {
  movie: IMovie;
}

export default function MovieCard({ movie }: IMovieCard) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'white' }}>
      <div className="relative shadow-md h-full flex flex-col group hover:bg-slate-600 p-2 bg-slate-800 rounded-lg">
        <span
          className={`absolute -top-1 -right-1 p-1 flex w-10 h-10  items-center justify-center rounded-full ${
            movie.vote_average > 6 ? 'bg-green-500' : 'bg-red-500 '
          }`}
        >
          {movie.vote_average}
        </span>
        <img
          className="object-cover"
          src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''}`}
          alt={movie.title}
        />
        <div className="grid place-content-center text-center text-gray-200">
          <div className="font-black text-base mb-2">{movie ? movie.original_title : ''}</div>
          <div className="mb-1 text-xs">{movie ? movie.release_date : ''}</div>
          <div className="text-xs mb1">{movie ? movie.overview.slice(0, 111) + '...' : ''}</div>
        </div>
      </div>
    </Link>
  );
}
