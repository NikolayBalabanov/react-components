import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

interface IPaginationBoard {
  totalPages: number;
  onPaginate: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
}

export const PaginationBoard: FC<IPaginationBoard> = ({ onPaginate, page, totalPages }) => {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="p-3 bg-slate-200 rounded-lg">
        <Pagination
          page={+page}
          onChange={onPaginate}
          count={totalPages}
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
