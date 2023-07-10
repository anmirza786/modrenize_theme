import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
// import { useAppSelector } from '@/redux/store';

const CustomPagination = ({ data, getList, pageRange, setPageRange }) => {
  // const pages = useAppSelector((state) => state.User.userList);
  const [previousPage, setPreviousPage] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChange = (event) => {
    setPageRange(event.target.value);
    getList({ page: 1, page_size: event.target.value });
  };
  React.useEffect(() => {
    if (data?.next) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    if (data?.previous) {
      setPreviousPage(true);
    } else {
      setPreviousPage(false);
    }
  }, [data]);

  const handlePrevious = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
      getList({ page: currentPage - 1 });
      console.log(data.previous);
    }
  };
  const handleNext = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
      getList({ page: currentPage + 1 });
      console.log(data.next);
    }
  };

  return (
    <Stack justifyContent="space-between" direction="row" width="100%" mt={5}>
      <Box display="inline-flex" alignItems="center">
        <FormControl sx={{ ml: 0, mr: 1, minWidth: 70 }} size="small">
          <Select
            value={pageRange}
            onChange={handleChange}
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
        <IconButton
          color="secondary"
          disabled={previousPage ? false : true}
          onClick={handlePrevious}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <Typography
          variant="h5"
          color="primary"
          sx={{
            minWidth: '40px',
            height: '40px',
            borderRadius: '5px',
            color: '#271FE0',
            // border: "1px solid #cecece",
            textAlign: 'center',
            p: '7px',
            boxShadow: '0px 1px 4px 0px #1A1A431A',
          }}
        >
          {currentPage}
        </Typography>
        <IconButton color="secondary" disabled={nextPage ? false : true} onClick={handleNext}>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
export default CustomPagination;
