import React, { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Form';

interface INameInput {
  name: keyof Inputs;
  error: FieldError | undefined;
  register: UseFormRegister<Inputs>;
}
const NAME_ERROR_MESSAGE = 'Аt least 2 words starting with a capital letter are expected';

const NameInput: FC<INameInput> = ({ error, name, register }) => {
  return (
    <>
      <input
        className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
        type="text"
        placeholder="Enter contact's name and surname"
        {...register(name, {
          required: true,
          pattern: /([A-ZА-Я]{1}[a-zа-я]+)( [A-ZА-Я]{1}[a-zа-я]+)+/,
        })}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <span className="text-sm text-red-600">{NAME_ERROR_MESSAGE}</span>}
    </>
  );
};

export default NameInput;
