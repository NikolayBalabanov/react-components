import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface INavItemProps {
  title: string;
  to: string;
  className?: string;
}

export default class NavItem extends Component<INavItemProps> {
  constructor(props: INavItemProps) {
    super(props);
  }
  render() {
    const { title, to, className } = this.props;
    return (
      <li>
        <Link className={className} to={to}>
          {title}
        </Link>
      </li>
    );
  }
}
