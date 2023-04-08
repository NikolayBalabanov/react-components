import { Link } from 'react-router-dom';
import { IMovie } from '../models/movie';
import React from 'react';

interface IMovieCard {
  movie: IMovie;
}

export default function MovieCard({ movie }: IMovieCard) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'white' }}>
      <div className="relative shadow-md overflow-hidden cursor-pointer h-full group">
        <img
          className="w-full h-full object-cover group-hover:scale-110"
          src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''}`}
          alt={movie.title}
        />
        <div className="absolute w-full h-full top-0 left-0 grid place-content-center text-center text-red-300">
          <div className="font-black text-base mb-2">{movie ? movie.original_title : ''}</div>
          <div className="mb-1 text-xs">
            {movie ? movie.release_date : ''}
            <span className="">
              {movie ? movie.vote_average : ''}
              <i className="fas fa-star" />
            </span>
          </div>
          <div className="text-xs mb1">{movie ? movie.overview.slice(0, 118) + '...' : ''}</div>
        </div>
      </div>
    </Link>
  );
}
