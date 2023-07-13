import React from 'react';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';

export const ActionButtons = (params) => {
  return (
    <>
      <Box sx={{ display: 'inline' }}>
        <IconButton aria-label="edit" size="small">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};
