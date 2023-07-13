import React from 'react';
import { styled, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    border: '1px solid rgba(103, 108, 113, 0.5)',
    borderRadius: '5px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    marginRight: '5px',
    cursor: 'pointer',
    '&:focus': {
      width: '20ch',
    },
    width: '0ch',
  },
}));

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const Search = ({ handleApplySearch, setSearch, search }) => {
  return (
    <Box component="form" onSubmit={handleApplySearch}>
      <SearchField>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
          sx={
            search && {
              color: 'black',
              '& .MuiInputBase-input': {
                width: '20ch',
                '&:focus': {
                  width: '20ch',
                },
              },
            }
          }
        />
      </SearchField>
    </Box>
  );
};

export default Search;
