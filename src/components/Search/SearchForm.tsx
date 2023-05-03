import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchClear from './SearchClear';
import SearchIncon from './SearchIncon';
import { ButtonSubmit } from '../UI/ButtonSubmit';
import { setSearch } from '../../redux/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface ISearchForm {
  placeholder: string;
  mode: 'search-movie';
}

export const SearchForm: FC<ISearchForm> = ({ placeholder, mode }) => {
  const dispatch = useAppDispatch();
  const { search: storedSearch } = useAppSelector((store) => store.searchSlice);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get(mode) || '';
  const [value, setValue] = useState(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const applySearchParams = (searchValue: string) => {
    searchParams.delete('page');
    searchParams.delete('filter');
    if (!searchValue) {
      searchParams.delete(mode);
    } else {
      searchParams.set(mode, searchValue);
    }
    dispatch(setSearch(searchValue));
    setSearchParams(searchParams);
  };
  useEffect(() => {
    const filter = searchParams.get('filter');
    const page = searchParams.get('page');
    const search = searchParams.get(mode);
    if (filter) {
      dispatch(setSearch(''));
      setValue('');
    }
    if (search || filter || page) return;
    if (!storedSearch) return;
    searchParams.append(mode, storedSearch);
    setSearchParams(searchParams);
    setValue(storedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
