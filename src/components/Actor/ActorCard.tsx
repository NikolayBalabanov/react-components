import React from 'react';
import { PLACEHOLDER_IMG, SMALL_IMG } from '../../utils/consts';

interface IActorCardProps {
  name: string;
  imgPath: string | null;
}

export default function ActorCard({ imgPath, name }: IActorCardProps) {
  const actorImg = imgPath ? SMALL_IMG + imgPath : PLACEHOLDER_IMG;

  return (
    <div className="relative overflow-hidden h-full flex flex-col justify-between p-2 gap-3 group bg-slate-800 shadow-md rounded-lg">
      <div className="overflow-hidden">
        <img className="card-img" src={actorImg} alt={name} />
      </div>
      <h3 className="absolute bottom-0 left-0 p-4 sm:px-2 sm:py-1 max-w-full rounded-lg text-center text-gray-200 font-black sm:font-normal text-base bg-slate-800 is-short">
        {name}
      </h3>
    </div>
  );
}
