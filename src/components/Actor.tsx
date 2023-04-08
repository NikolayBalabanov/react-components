import React from 'react';
import { SMALL_IMG } from '../utils/consts';

interface IActor {
  name: string;
  imgPath: string;
}

export default function Actor({ imgPath, name }: IActor) {
  const actorImg = imgPath ? SMALL_IMG + imgPath : SMALL_IMG;

  return (
    <div className="flex flex-col gap-2 snap-start">
      <img src={actorImg} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}
