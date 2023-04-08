import React from 'react';

interface IErrorMessage {
  content: string;
}

export default function ErrorMessage({ content }: IErrorMessage) {
  return <h2 className="my-14 text-3xl font-bold">{content}</h2>;
}
