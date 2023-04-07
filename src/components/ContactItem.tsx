import { IContact } from 'pages/Forms';
import React, { FC } from 'react';

interface IContactItemProps {
  contact: IContact;
}

const ContactItem: FC<IContactItemProps> = ({ contact }) => {
  return (
    <div className="p-4 rounded-lg flex flex-col bg-slate-300" key={contact.id}>
      <img
        className="h-80 object-cover rounded-md mb-3 hover:scale-105 transition-transform"
        src={contact.photo.toString()}
        alt={contact.name}
      />
      <h2 className="text-lg font-medium mb-1">{contact.name}</h2>
      <a className="text-base font-medium mb-1" href={`tel:${contact.phone}`}>
        Phone: {contact.phone}
      </a>
      {contact.date.length === 3 && (
        <span className="text-base mb-1">
          {'Birthday: '} {contact.date[2]} <b>d</b> {contact.date[1]} <b>m</b> {contact.date[0]}
        </span>
      )}
      <span className="text-base mb-1">Role: {contact.role}</span>
      {contact.favorite && (
        <span className="self-start text-base mb-1 p-1 bg-green-300 rounded">FAVORITE</span>
      )}
      <span className="text-base">Gender: {contact.gender}</span>
    </div>
  );
};

export default ContactItem;
