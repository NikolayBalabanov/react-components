import React from 'react';

interface IActor {
  name: string;
  imgPath: string;
}

export default function Actor({ imgPath, name }: IActor) {
  return (
    <div className="flex flex-col gap-2 snap-start">
      <img src={imgPath} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}
