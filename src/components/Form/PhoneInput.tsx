import React, { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Form';

interface IPhoneInput {
  name: keyof Inputs;
  error: FieldError | undefined;
  register: UseFormRegister<Inputs>;
}

const PHONE_ERROR_MESSAGE =
  'Must start with "+", contain only digits and be no shorter than 9 digits';

const PhoneInput: FC<IPhoneInput> = ({ error, name, register }) => {
  return (
    <>
      <input
        className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
        type="text"
        placeholder="Enter contact's phone"
        {...register(name, { required: true, pattern: /[\+][\d]{9,14}/ })}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <span className="text-sm text-red-600">{PHONE_ERROR_MESSAGE}</span>}
    </>
  );
};

export default PhoneInput;
