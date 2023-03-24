import Form, { TErrorsUpdate } from '../components/Form';
import React, { Component } from 'react';
import ContactItem from '../components/ContactItem';

export interface IContact {
  id: number;
  name: string;
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
}

export default class Forms extends Component<object> {
  state: Readonly<IFormsState> = {
    contacts: [],
    genderError: '',
    nameError: '',
  };

  hendleUpdateContacts = (newArr: IContact[]) => {
    this.setState({ contacts: newArr });
  };

  hendleUpdateErrors = (newErrors: TErrorsUpdate) => {
    this.setState((prev) => ({ ...prev, ...newErrors }));
  };

  render() {
    console.log(this.state);
    return (
      <div className="container mx-auto pt-5">
        <div className="container mx-auto max-w-3xl">
          <Form
            prevState={this.state}
            updateContacts={this.hendleUpdateContacts}
            updateErrors={this.hendleUpdateErrors}
          />
        </div>
        <div>
          <ul className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
            {this.state.contacts.map((contact) => (
              <ContactItem contact={contact} key={contact.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
