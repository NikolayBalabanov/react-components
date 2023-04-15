import React, { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Form';

interface IPhoneInput {
  name: keyof Inputs;
  error: FieldError | undefined;
  register: UseFormRegister<Inputs>;
}

const GENDER_ERROR_MESSAGE = 'Please select one of the values';

const GenderRadio: FC<IPhoneInput> = ({ error, name, register }) => {
  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center">
        <h3 className="text-xl font-medium mr-2">Gender:</h3>
        <label className="flex items-center px-2 mr-3">
          Male
          <input
            className="ml-2"
            type="radio"
            value="Male"
            id="Male"
            {...register(name, { required: true })}
          />
        </label>
        <label>
          Female
          <input
            className="ml-2"
            type="radio"
            value="Female"
            id="Female"
            {...register(name, { required: true })}
          />
        </label>
      </div>
      {error && <span className="text-sm text-red-600">{GENDER_ERROR_MESSAGE}</span>}
    </div>
  );
};

export default GenderRadio;
