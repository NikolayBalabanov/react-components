import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { SwipedList } from '../SwipedList';
import ActorCard from './ActorCard';
import { movieAPI } from '../../services/MovieService';

interface IMovieActorsListProps {
  movieId: number;
}

export default function MovieActorsList({ movieId }: IMovieActorsListProps) {
  const { data } = movieAPI.useGetActorsByMovieIdQuery(movieId);
  const movieActors = data?.cast || [];

  if (!movieActors.length) return <></>;
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
