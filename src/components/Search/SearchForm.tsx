import React, { FC, useEffect } from 'react';
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
  const search = searchParams.get(mode || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  useEffect(() => {
    const filter = searchParams.get('filter');
    const page = searchParams.get('page');
    if (filter) dispatch(setSearch(''));
    if (search || filter || page) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    applySearchParams(storedSearch);
  };

  const handleClear = () => {
    applySearchParams('');
    dispatch(setSearch(''));
  };
  return (
    <div className="flex justify-center">
      <form className="flex gap-3" onSubmit={(event) => handleSubmit(event)}>
        <div className="relative sm:w-auto w-full">
          <input
            className="border self-center rounded py-2 px-4 w-full bg-slate-200"
            type="text"
            value={storedSearch}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
          />
          {storedSearch ? <SearchClear onClear={() => handleClear()} /> : <SearchIncon />}
        </div>
        <ButtonSubmit />
      </form>
    </div>
  );
};
