import React, { useEffect, useRef } from 'react';
import Loader from './Loader';
import ActorsList from './ActorsList';
import ButtonClose from './ButtonClose';
import ErrorMessage from './ErrorMessage';
import { getMovie } from '../redux/ac/movie.ac';
import { ButtonTrailer } from './ButtonTrailer';
import { BIG_IMG, PLACEHOLDER_IMG } from '../utils/consts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

interface IMovieModal {
  onClose: () => void;
  movieId: number;
}

export default function MovieModal({ onClose, movieId }: IMovieModal) {
  const dispatch = useAppDispatch();
  const { movie, isLoading, movieError } = useAppSelector((store) => store.movieSlice);
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getMovie(movieId));
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = (fn: () => void) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      fn();
    }, 300);
  };
  const getPosterImg = () => {
    if (movie) {
      return movie.poster_path ? BIG_IMG + movie.poster_path : PLACEHOLDER_IMG;
    }
  };

  return (
    <div
      ref={modal}
      onClick={() => close(onClose)}
      className="flex items-center justify-center rounded-lg overflow-x-hidden overflow-y-auto fixed inset-0 z-30 bg-gray-500 bg-opacity-80 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={modalContent}
        className="w-11/12 h-[90vh] overflow-auto flex flex-col relative rounded-lg shadow-md  bg-gray-700 p-6 -translate-y-10 duration-300 transition-transform dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && <Loader />}
        {movieError && <ErrorMessage content={movieError} />}
        {movie && (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 place-content-center">
            <div className="col-span-1 flex justify-center">
              <img
                className="object-fill lg:max-h-[80vh] lg:w-full w-2/3 rounded-lg bg-gray-400 aspect-auto shadow-xl shadow-black"
                src={getPosterImg()}
                alt={movie.title}
              />
            </div>
            <div className="col-span-2 flex flex-col h-full items-center justify-center w-full text-slate-200">
              <h3 className="md:mb-5 mb-3 font-bold lg:text-4xl text-3xl text-center ">
                {movie.title}
              </h3>
              <p className="mb-3 rounded-lg text-center">{movie.overview}</p>
              <ActorsList movieId={movie.id} />
              <ButtonTrailer movieId={movie.id} />
            </div>
          </div>
        )}
        <ButtonClose callback={() => close(onClose)} />
      </div>
    </div>
  );
}
