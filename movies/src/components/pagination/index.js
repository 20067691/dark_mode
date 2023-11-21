import React from 'react';
import { Pagination } from '@mui/material';

const Pagination1 = ({ currentPage, onPageChange }) => {
  const handleChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count= {10}
        page={currentPage}
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
};

export default Pagination1;