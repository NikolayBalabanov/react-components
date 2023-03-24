import Form, { TErrorsUpdate } from '../components/Form';
import React, { Component } from 'react';

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
          <ul>
            {this.state.contacts.map((contact) => (
              <div key={contact.id}>
                <h2>{contact.name}</h2>
                <span>{contact.date}</span>
                <span>Role: {contact.role}</span>
                {contact.favorite && <span>FAVORITE</span>}
                <span>Gender: {contact.gender}</span>
                <img src={contact.photo.toString()} alt={contact.name} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
