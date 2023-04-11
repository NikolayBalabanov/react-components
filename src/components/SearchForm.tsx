import React, { FC, useEffect, useState } from 'react';
import { ButtonSubmit } from './ButtonSubmit';
import SearchClear from './SearchClear';
import SearchIncon from './SearchIncon';

interface ISearchForm {
  onFormSubmit: (reqStr: string) => void;
}

export const SearchForm: FC<ISearchForm> = ({ onFormSubmit }) => {
  const [value, setValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(value);
    localStorage.setItem('input', value);
  };

  const handleClear = () => {
    onFormSubmit('');
    localStorage.setItem('input', '');
    setValue('');
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('input') ?? '';
    setValue(savedValue);
  }, []);
  return (
    <div className="flex mx-auto max-w-2xl pt-5 justify-center">
      <form className="flex gap-3" onSubmit={(event) => handleSubmit(event)}>
        <div className="relative sm:w-auto w-full">
          <input
            className="border self-center rounded py-2 px-4 w-full"
            type="text"
            value={value}
            onChange={(e) => handleChange(e)}
            placeholder="Search a movie..."
          />
          {value ? <SearchClear onClear={() => handleClear()} /> : <SearchIncon />}
        </div>
        <ButtonSubmit />
      </form>
    </div>
  );
};
