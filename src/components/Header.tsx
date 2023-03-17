import React, { Component } from 'react';
import Nav from './Nav';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>Searcher</h1>
        <Nav />
      </div>
    );
  }
}
