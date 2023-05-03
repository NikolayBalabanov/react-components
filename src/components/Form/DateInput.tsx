import React, { FC } from 'react';
import { Inputs } from './Form';
import { UseFormRegister } from 'react-hook-form';

interface IDateInput {
  name: keyof Inputs;
  register: UseFormRegister<Inputs>;
}

const DateInput: FC<IDateInput> = ({ name, register }) => {
  return (
    <label className="text-xl font-medium">
      Birth date:
      <input
        className="border rounded py-1 px-2 ml-2 mb-2"
        type="date"
        min="01-01-1900"
        pattern="\d{2}-\d{2}-\d{4}"
        {...register(name)}
      />
    </label>
  );
};

export default DateInput;
