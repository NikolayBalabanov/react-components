import React, { Component } from 'react';
import NavItem from './NavItem';

export interface IPage {
  name: string;
  link: string;
}

export default class Nav extends Component {
  public render() {
    const pages: IPage[] = [
      {
        name: 'about',
        link: '/about',
      },
      {
        name: 'main',
        link: '/',
      },
    ];
    return pages.map((page) => <NavItem key={page.name} title={page.name} to={page.link} />);
  }
}
