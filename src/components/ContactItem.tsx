import { IContact } from 'pages/Forms';
import React, { Component } from 'react';

interface IContactItemProps {
  contact: IContact;
}

export default class ContactItem extends Component<IContactItemProps> {
  constructor(props: IContactItemProps) {
    super(props);
  }
  render() {
    return (
      <div className="p-4 rounded-lg flex flex-col bg-slate-300" key={this.props.contact.id}>
        <img
          className="rounded-md mb-3 hover:scale-105 transition-transform"
          src={this.props.contact.photo.toString()}
          alt={this.props.contact.name}
        />
        <h2 className="text-lg font-medium mb-1">{this.props.contact.name}</h2>
        {this.props.contact.date.length === 3 && (
          <span className="text-base mb-1">
            Birthday
            {this.props.contact.date[2]} d {this.props.contact.date[1]} m{' '}
            {this.props.contact.date[0]}
          </span>
        )}
        <span className="text-base mb-1">Role: {this.props.contact.role}</span>
        {this.props.contact.favorite && (
          <span className="self-start text-base mb-1 p-1 bg-green-300 rounded">FAVORITE</span>
        )}
        <span className="text-base">Gender: {this.props.contact.gender}</span>
      </div>
    );
  }
}
