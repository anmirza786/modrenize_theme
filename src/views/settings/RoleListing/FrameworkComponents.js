import React, { useState } from 'react';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';

export const ActionButtons = (params) => {
  const [dialogObj, setDialogObj] = useState(null);
  const dialogType = {
    delete: 'DELETE',
    update: 'UPDATE',
    view: 'VIEW',
  };
  return (
    <>
      <Box sx={{ display: 'inline' }}>
        <IconButton onClick={() => setDialogObj(dialogType.update)} aria-label="edit" size="small">
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => setDialogObj(dialogType.delete)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};
