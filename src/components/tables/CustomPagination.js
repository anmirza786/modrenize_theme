import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Pagination } from '@mui/material';

const CustomPagination = ({ data, getList, pageRange, setPageRange }) => {
  const handleChangeRange = (event) => {
    setPageRange(event.target.value);
    getList({ page: 1, page_size: event.target.value });
  };
  const handleChange = (event, value) => {
    getList({ page: value });
  };

  return (
    <Stack justifyContent="space-between" direction="row" width="100%" mt={5}>
      <Box display="inline-flex" alignItems="center">
        <FormControl sx={{ ml: 0, mr: 1, minWidth: 70 }} size="small">
          <Select
            value={pageRange}
            onChange={handleChangeRange}
            sx={{
              border: '1px solid #EAEAEF',
              boxShadow: '0px 1px 4px 0px #2121341A',
              fontWeight: 'bold',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" color="GrayText">
          Entries Per Page
        </Typography>
      </Box>
      <Box display="inline-flex" alignItems="center">
        <Pagination
          count={data?.totalPages}
          page={data?.currentPage}
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Stack>
  );
};
export default CustomPagination;
