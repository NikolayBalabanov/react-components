import Form from '../components/Form/Form';
import React, { FC } from 'react';
import ContactItem from '../components/Form/ContactItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addContact } from '../redux/slices/contactsSlice';
import { IContact } from '../types/contacts';

const Forms: FC = () => {
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector((store) => store.contactsSlice);
  const hendleUpdateContacts = (newContact: IContact) => {
    dispatch(addContact(newContact));
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
