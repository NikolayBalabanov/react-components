import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SelectItem from './SelectItem';
import Icon, { EIcons } from '../Icon';
import { EMoviesFilter } from '../../../types/EMoviesFilter';
import { TSelectFieldsMovies } from 'types/selectFieldsMovies';

interface ISelectProps {
  selectFields: TSelectFieldsMovies;
}

export default function Select({ selectFields }: ISelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get('filter') || EMoviesFilter.popular;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fieldsArr = selectFields.filter((el) => el.value !== current);
  const targetField = selectFields.filter((el) => el.value === current)[0].text;
  const select = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const handleClick = (value: EMoviesFilter) => {
    const newSearch = new URLSearchParams();
    newSearch.set('filter', value);
    setIsOpen(false);
    setSearchParams(newSearch);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (select.current && !event.composedPath().includes(select.current) && isMounted.current) {
        setIsOpen(false);
      }
      isMounted.current = true;
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  return (
    <div ref={select} className="relative">
      <button
        type="button"
        className={`${
          isOpen
            ? 'border-b border-b-colorGrey rounded-t-lg'
            : 'border-b border-transparent rounded-lg'
        } select-item`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{targetField}</span>
        <Icon
          name={EIcons.arrow}
          styles={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-full">
          {fieldsArr.map((el) => (
            <SelectItem
              key={el.value}
              onChooseFilter={handleClick}
              value={el.value}
              text={el.text}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
