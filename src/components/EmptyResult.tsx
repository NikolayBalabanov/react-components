import React from 'react';

export default function EmptyResult() {
  return (
    <div className="flex flex-col items-center p-4 my-16">
      <h2 className="mb-4 max-w-[500px] text-slate-50 text-3xl font-bold text-center">
        Hmm... Result is empty. Try to serach something else!
      </h2>
      <img
        className="w-[480px] h-[270px] rounded"
        src="https://media1.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif"
        alt="Empty result"
      />
    </div>
  );
}
