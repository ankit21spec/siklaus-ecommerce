import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default Pagination;
