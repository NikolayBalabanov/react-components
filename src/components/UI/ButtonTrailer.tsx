import React, { FC, useEffect } from 'react';
import { getMovieTrailer } from '../../redux/ac/movie.ac';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface IButtonTrailer {
  movieId: number;
}

export const ButtonTrailer: FC<IButtonTrailer> = ({ movieId }) => {
  const dispatch = useAppDispatch();
  const { trailerLink } = useAppSelector((state) => state.movieSlice);
  useEffect(() => {
    dispatch(getMovieTrailer(movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!trailerLink) {
    return <></>;
  }

  return (
    <a
      className="mb-[10px] px-4 py-1 self-center rounded-lg border-none bg-red-500 hover:bg-red-600 focus-visible:bg-gray-600 outline-none"
      href={`https://www.youtube.com/watch?v=${trailerLink}`}
      target="_blank"
      rel="noreferrer"
    >
      Watch trailer!
    </a>
  );
};
