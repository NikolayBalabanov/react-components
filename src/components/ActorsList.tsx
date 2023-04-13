import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getMovieActors } from '../redux/ac/movie.ac';
import { SwipedList } from './SwipedList';
import ActorCard from './ActorCard';

interface IMovieActorsListProps {
  movieId: number;
}

export default function MovieActorsList({ movieId }: IMovieActorsListProps) {
  const dispatch = useAppDispatch();
  const { movieActors } = useAppSelector((store) => store.movieSlice);
  console.log('ACTORS', movieActors);
  console.log('movieId', movieId);

  useEffect(() => {
    dispatch(getMovieActors(movieId));
  }, []);

  if (!movieActors.length) return <></>;
  console.log('ACTORS');
  const artorsList = movieActors.map((actor) => (
    <SwiperSlide key={actor.id}>
      <ActorCard name={actor.original_name} imgPath={actor.profile_path} />
    </SwiperSlide>
  ));

  return (
    <div className="w-full mb-3">
      <SwipedList>{artorsList}</SwipedList>
    </div>
  );
}
