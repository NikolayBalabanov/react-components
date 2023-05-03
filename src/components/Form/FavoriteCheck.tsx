import React, { FC } from 'react';
import { Inputs } from './Form';
import { UseFormRegister } from 'react-hook-form';

interface IFavoriteCheck {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
}

const FavoriteCheck: FC<IFavoriteCheck> = ({ name, register }) => {
  return (
    <label className="text-xl font-medium flex items-center">
      Favorite:
      <input
        className="rounded py-1 px-2 ml-2"
        type="checkbox"
        value="true"
        id="favorite"
        {...register(name)}
      />
    </label>
  );
};

export default FavoriteCheck;
