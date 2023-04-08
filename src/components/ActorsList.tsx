import React, { useEffect, useState } from 'react';
import { IActor } from '../models/actor';
import Actor from './Actor';
import { useFetching } from '../hooks/useFetching';
import MoviesService from '../API/MoviesService';

interface IActorsList {
  movieId: number;
}

export default function ActorsList({ movieId }: IActorsList) {
  const [actors, setActors] = useState<IActor[]>([]);
  const { fetching } = useFetching(async () => {
    const response = await MoviesService.getActorsByModieId(movieId);
    setActors(response.data.cast);
  });
  const artorsList = actors.map((actor) => (
    <Actor key={actor.id} name={actor.original_name} imgPath={actor.profile_path} />
  ));
  useEffect(() => {
    fetching();
  }, []);
  return <ul className="flex overflow-auto snap-mandatory">{artorsList}</ul>;
}
