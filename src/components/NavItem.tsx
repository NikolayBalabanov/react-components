import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface INavItemProps {
  title: string;
  to: string;
}

export default class NavItem extends Component<INavItemProps> {
  constructor(props: INavItemProps) {
    super(props);
  }
  render() {
    const { title, to } = this.props;
    return (
      <li>
        <Link to={to}>{title}</Link>
      </li>
    );
  }
}
