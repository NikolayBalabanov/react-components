import React, { FC, useEffect, useRef, useState } from 'react';
import { ButtonSubmit } from './ButtonSubmit';

interface ISearchForm {
  onFormSubmit: (reqStr: string) => void;
}

export const SearchForm: FC<ISearchForm> = ({ onFormSubmit }) => {
  const [value, setValue] = useState<string>('');
  const inputValue = useRef('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('input') ?? '';
    setValue(savedValue);
    return () => {
      localStorage.setItem('input', inputValue.current);
    };
  }, []);

  useEffect(() => {
    inputValue.current = value;
  }, [value]);
  return (
    <div className="flex mx-auto max-w-2xl pt-5 justify-center">
      <form className="flex gap-3" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="border self-center rounded py-2 px-4 mb-2 w-full"
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Search a movie"
        />
        <ButtonSubmit />
      </form>
    </div>
  );
};
