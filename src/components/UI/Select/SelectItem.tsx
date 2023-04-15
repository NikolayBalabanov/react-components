import React from 'react';
import { EMoviesFilter } from '../../../types/EMoviesFilter';

interface ISelectItem {
  onChooseFilter: (target: EMoviesFilter) => void;
  value: EMoviesFilter;
  text: string;
}

export default function SelectItem({ onChooseFilter, value, text }: ISelectItem) {
  return (
    <button type="button" className="select-item dropped" onClick={() => onChooseFilter(value)}>
      <span>{text}</span>
    </button>
  );
}
