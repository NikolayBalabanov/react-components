import React, { Component } from 'react';
import NavItem from './NavItem';

export interface IPage {
  name: string;
  link: string;
}

export default class Nav extends Component {
  public render() {
    return (
      <nav className="">
        <ul className="list-none flex">
          <NavItem
            className="mr-3 font-bold text-xl  hover:text-red-400 transition-colors"
            title="about"
            to="/about"
          />
          <NavItem
            className="mr-3 font-bold text-xl hover:text-red-400 transition-colors"
            title="main"
            to="/"
          />
          <NavItem
            className="font-bold text-xl hover:text-red-400 transition-colors"
            title="forms"
            to="/forms"
          />
        </ul>
      </nav>
    );
  }
}
