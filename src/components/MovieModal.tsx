import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ButtonClose from './ButtonClose';
import { IMovie } from '../models/movie';
import { useFetching } from '../hooks/useFetching';
import MoviesService from '../API/MoviesService';
import { BIG_IMG, PLACEHOLDER_IMG } from '../utils/consts';
import ActorsList from './ActorsList';
import Loader from './Loader';

interface IMovieModal {
  onClose: () => void;
  movie: IMovie;
}

export default function MovieModal({ onClose, movie }: IMovieModal) {
  const [trailerLink, setTrailerLink] = useState<string>('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const { fetching, isLoading, error } = useFetching(async () => {
    const response = await MoviesService.getTrailerByModieId(movie.id);
    setTrailerLink(response.data.results[0]?.key);
  });

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
    fetching();
  }, []);

  const close = (fn: () => void) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      fn();
    }, 300);
  };
  const { poster_path, title, overview, id } = movie;
  const posterImg = poster_path ? BIG_IMG + poster_path : PLACEHOLDER_IMG;

  return createPortal(
    <div
      ref={modal}
      onClick={() => close(onClose)}
      className="flex items-center justify-center rounded-lg overflow-x-hidden overflow-y-auto fixed inset-0 z-30 bg-gray-500 bg-opacity-80 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={modalContent}
        className="w-11/12 h-4/5 flex flex-col relative rounded-lg shadow-md bg-gray-700 md:px-[84px] px-10 py-[25px] -translate-y-10 duration-300 transition-transform dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && <Loader />}
        {error && (
          <h2 className="md:mb-5 mb-3 font-bold text-4xl">Oops! Something goes wrong...</h2>
        )}
        <div className="h-full w-full flex gap-4 mb-[20px]">
          <div className="flex w-1/3">
            <img className="object-fill h-full w-full" src={posterImg} alt={title} />
          </div>
          <div className="flex flex-col items-center w-2/3 text-slate-200">
            <h3 className="md:mb-5 mb-3 font-bold text-4xl ">{title}</h3>
            <p className="mb-3 rounded-lg text-center">{overview}</p>
            <ActorsList movieId={id} />
            <a
              className="mb-[10px] px-4 py-1 self-center rounded-lg border-none bg-gray-400 hover:bg-gray-600 focus-visible:bg-gray-600 outline-none"
              href={`https://www.youtube.com/watch?v=${trailerLink}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch trailer!
            </a>
          </div>
        </div>
        <ButtonClose callback={() => close(onClose)} />
      </div>
    </div>,
    document.getElementById('modal') as HTMLDivElement
  );
}
