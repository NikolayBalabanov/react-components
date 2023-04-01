import Form from '../components/Form';
import React, { FC, useState } from 'react';
import ContactItem from '../components/ContactItem';

export interface IContact {
  id: number;
  name: string;
  phone: string;
  date: string[];
  role: string;
  favorite: boolean;
  gender: 'male' | 'female';
  photo: string;
}

export interface IFormsState {
  contacts: IContact[];
  nameError: string;
  genderError: string;
  phoneError: string;
}

const Forms: FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const hendleUpdateContacts = (newArr: IContact[]) => {
    setContacts(newArr);
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="container mx-auto max-w-3xl mb-3">
        <Form contacts={contacts} updateContacts={hendleUpdateContacts} />
      </div>
      <div>
        <ul className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forms;
