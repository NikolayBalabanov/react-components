import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ConfirmModal from '../ConfirmModal';
import { IContact } from '../../types/contacts';
import NameInput from './NameInput';
import PhoneInput from './PhoneInput';
import DateInput from './DateInput';
import RoleInput from './RoleInput';
import FavoriteCheck from './FavoriteCheck';
import GenderRadio from './GenderRadio';
import { ButtonSubmit } from '../../components/UI/ButtonSubmit';

interface IFormProps {
  updateContacts: (e: IContact) => void;
  contacts: IContact[];
}

export type Inputs = {
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
    updateContacts(newContact);
    reset();
  };

  return (
    <form className="flex flex-col items-start px-4" onSubmit={handleSubmit(onSubmit)}>
      {isModalOpen && <ConfirmModal onConfirm={() => setIsModalOpen(false)} />}
      <h2 className="mb-3 text-2xl font-semibold">Here you can add your contacts info</h2>
      <NameInput error={errors.name} name="name" register={register} />
      <PhoneInput error={errors.phone} name="phone" register={register} />
      <DateInput name="date" register={register} />
      <RoleInput name="role" register={register} />
      <FavoriteCheck name="favorite" register={register} />
      <GenderRadio error={errors.gender} name="gender" register={register} />
      <label className="flex flex-col text-xl font-medium mb-3">
        Add photo:
        <input type="file" accept="image/*" {...register('file')} />
      </label>
      <ButtonSubmit />
    </form>
  );
};

export default Form;
