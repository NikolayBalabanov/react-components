import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NeverPage extends Component {
  render() {
    return (
      <div className="containe mx-auto  md:p-10 p-3 ">
        <div className="relative overflow-hidden rounded-2xl flex items-center justify-center">
          <img
            className="w-full object-cover opacity-70"
            src="https://cdn.pixabay.com/photo/2013/07/13/14/03/film-162029_960_720.png"
            alt="404 page not found"
          />
          <div className="absolute flex items-center justify-center flex-col">
            <h2 className="mb-3 font-bold sm:ext-5xl text-3xl text-center text-orange-500">{`404 — page doesn't exist`}</h2>
            <Link
              to="/"
              className="border border-blue-500 rounded-sm h-fit bg-slate-200 px-5 py-2 hover:bg-blue-500 transition-colors"
            >
              Back to movies
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
