import React, { FC, useEffect, useState } from 'react';
import { ButtonSubmit } from '../ButtonSubmit';
import SearchClear from './SearchClear';
import SearchIncon from './SearchIncon';
import { useSearchParams } from 'react-router-dom';

interface ISearchForm {
  placeholder: string;
  mode: 'search-movie';
}

export const SearchForm: FC<ISearchForm> = ({ placeholder, mode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get(mode || '');
  const [value, setValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const filter = searchParams.get('filter');
    const page = searchParams.get('page');
    if (filter) setValue('');
    if (search || filter || page) return;
  }, [search]);
  const applySearchParams = (searchValue: string) => {
    searchParams.delete('page');
    searchParams.delete('filter');
    if (!searchValue) {
      searchParams.delete('search-movie');
    } else {
      searchParams.set(mode, searchValue);
    }
    setSearchParams(searchParams);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applySearchParams(value);
  };

  const handleClear = () => {
    applySearchParams('');
    setValue('');
  };
  return (
    <div className="flex justify-center">
      <form className="flex gap-3" onSubmit={(event) => handleSubmit(event)}>
        <div className="relative sm:w-auto w-full">
          <input
            className="border self-center rounded py-2 px-4 w-full bg-slate-200"
            type="text"
            value={value}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
          />
          {value ? <SearchClear onClear={() => handleClear()} /> : <SearchIncon />}
        </div>
        <ButtonSubmit />
      </form>
    </div>
  );
};
