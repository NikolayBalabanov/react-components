import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="container mx-auto max-w-2xl pt-5 flex flex-col items-center">
        <h2 className="font-bold text-3xl mb-3">About page</h2>
        <img
          className="rounded"
          src="https://media.tenor.com/-cSWvXO8UUAAAAAC/leonardo-dicaprio-leo.gif"
          alt="leo gif"
        />
      </div>
    );
  }
}
