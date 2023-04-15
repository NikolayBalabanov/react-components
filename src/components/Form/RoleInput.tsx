import React, { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './Form';

interface IRoleInput {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
}

const RoleInput: FC<IRoleInput> = ({ name, register }) => {
  return (
    <label className="text-xl font-medium">
      Role:
      <select
        className="rounded py-1 px-4 w-28 ml-2 mb-2"
        defaultValue="friend"
        {...register(name)}
      >
        <option value="coworker">Coworker</option>
        <option value="family">Family</option>
        <option value="friend">Friend</option>
        <option value="stranger">Stranger</option>
      </select>
    </label>
  );
};

export default RoleInput;
