import React, { Component } from 'react';
import Nav from './Nav';

export default class Header extends Component {
  render() {
    return (
      <div className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
        <h1 className="font-bold">Searcher</h1>
        <Nav />
      </div>
    );
  }
}
