import { IContact } from 'pages/Forms';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ConfirmModal from './ConfirmModal';

interface IFormProps {
  updateContacts: (e: IContact[]) => void;
  contacts: IContact[];
}

const NAME_ERROR_MESSAGE = 'Аt least 2 words starting with a capital letter are expected';
const PHONE_ERROR_MESSAGE =
  'Must start with "+", contain only digits and be no shorter than 9 digits';
const GENDER_ERROR_MESSAGE = 'Please select one of the values';

type Inputs = {
  name: string;
  phone: string;
  role: RoleEnum;
  date: string;
  favorite: string;
  gender: 'male' | 'female';
  file: Blob[];
};

enum RoleEnum {
  coworker = 'coworker',
  family = 'family',
  friend = 'friend',
  stranger = 'stranger',
}

const Form: FC<IFormProps> = ({ contacts, updateContacts }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newContact: IContact = {
      id: contacts.length ? contacts.length : 0,
      name: data.name,
      phone: data.phone,
      date: data.date.split('-').length === 3 ? data.date.split('-') : [],
      role: data.role,
      favorite: !!data.favorite,
      gender: data.gender,
      photo: data.file[0]
        ? URL.createObjectURL(data.file[0])
        : 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    };
    setIsModalOpen(true);
    updateContacts([...contacts, newContact]);
    reset();
  };

  return (
    <form className="flex flex-col items-start px-4" onSubmit={handleSubmit(onSubmit)}>
      {isModalOpen && <ConfirmModal onConfirm={() => setIsModalOpen(false)} />}
      <h2 className="mb-3 text-2xl font-semibold">Here you can add your contacts info</h2>
      <input
        className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
        type="text"
        placeholder="Enter contact's name and surname"
        {...register('name', {
          required: true,
          pattern: /([A-ZА-Я]{1}[a-zа-я]+)( [A-ZА-Я]{1}[a-zа-я]+)+/,
        })}
        aria-invalid={errors.name ? 'true' : 'false'}
      />
      {errors.name && <span className="text-sm text-red-600">{NAME_ERROR_MESSAGE}</span>}
      <input
        className="border rounded py-1 px-4 mb-2 lg:w-80 sm:w-3/4 w-full"
        type="text"
        placeholder="Enter contact's phone"
        {...register('phone', { required: true, pattern: /[\+][\d]{9,14}/ })}
        aria-invalid={errors.phone ? 'true' : 'false'}
      />
      {errors.phone && <span className="text-sm text-red-600">{PHONE_ERROR_MESSAGE}</span>}
      <label className="text-xl font-medium">
        Birth date:
        <input
          className="border rounded py-1 px-2 ml-2 mb-2"
          type="date"
          min="01-01-1900"
          pattern="\d{2}-\d{2}-\d{4}"
          {...register('date')}
        />
      </label>
      <label className="text-xl font-medium">
        Role:
        <select
          className="rounded py-1 px-4 w-28 ml-2 mb-2"
          defaultValue="friend"
          {...register('role')}
        >
          <option value="coworker">Coworker</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="stranger">Stranger</option>
        </select>
      </label>
      <label className="text-xl font-medium flex items-center">
        Favorite:
        <input
          className="rounded py-1 px-2 ml-2"
          type="checkbox"
          value="true"
          id="favorite"
          {...register('favorite')}
        />
      </label>
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
              {...register('gender', { required: true })}
            />
          </label>
          <label>
            Female
            <input
              className="ml-2"
              type="radio"
              value="Female"
              id="Female"
              {...register('gender', { required: true })}
            />
          </label>
        </div>
        {errors.gender && <span className="text-sm text-red-600">{GENDER_ERROR_MESSAGE}</span>}
      </div>
      <label className="flex flex-col text-xl font-medium mb-3">
        Add photo:
        <input type="file" accept="image/*" {...register('file')} />
      </label>
      <button
        className="border border-blue-500 rounded-sm bg-white px-5 py-2 hover:bg-blue-500 transition-colors"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
