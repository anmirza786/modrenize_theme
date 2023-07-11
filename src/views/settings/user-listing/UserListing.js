// import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PageContainer from 'src/components/container/PageContainer';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { UserTable } from './UserTable';
// import { UserTableRows } from '@/utils/constants';
import CustomPagination from 'src/components/tables/CustomPagination';
import { getUserListing } from './userListingApi';
import { useCallback, useEffect, useState } from 'react';
import BackButton from 'src/components/BackButton';
import { useSelector } from 'react-redux';
import { InputBase, Stack, styled, alpha } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from 'src/components/tables/Filters';
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
    [theme.breakpoints.up('sm')]: {
      width: `${(props) => (props.value !== '' ? 20 : 0)}ch`,
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
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
  ...(props) =>
    props.value && {
      '& .MuiInputBase-input': {
        width: '20ch',
      },
    },
}));

const UsersListing = () => {
  const populateUsers = useCallback(async () => {
    getUserListing({ page: 1 });
  }, []);
  const [range, setRange] = useState(10);

  useEffect(() => {
    populateUsers();
  }, [populateUsers]);

  const userList = useSelector((state) => state.User.userList);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const handleSearch = async () => {
    await getUserListing({ page: 1, search });
  };
  const handleCancle = () => {
    setSearch('');
    populateUsers();
  };

  return (
    <PageContainer title="Global Tekmed - Users" description="this is user listing page">
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Box component="div">
          <BackButton />
          <Typography variant="h3">Users</Typography>
          <Typography variant="body1" color="GrayText">
            All the users who have access to the admin panel
          </Typography>
        </Box>
        <Box component="div">
          <Button
            size="large"
            component="a"
            href="/settings/user-listing/add-user"
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <Box component="div" my={2}>
        {!filterOpen ? (
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" justifyContent="start">
              <Box component="form" onSubmit={handleSearch}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    inputProps={{ 'aria-label': 'search', value: search }}
                  />
                </Search>
              </Box>
              {!search && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ color: '#000000' }}
                  onClick={() => {
                    setFilterOpen(true);
                  }}
                  startIcon={<FilterListIcon fontSize="small" />}
                >
                  Filters
                </Button>
              )}
            </Stack>
            {search && (
              <Stack direction="row" justifyContent="end">
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ xcolor: '#000000', mr: 1 }}
                  onClick={handleCancle}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  Search
                </Button>
              </Stack>
            )}
          </Stack>
        ) : (
          <Filter
          // filterValues={filterValues}
          // setFilterValues={setFilterValues}
          // handleFilter={handleFilter}
          // handleClearFilter={handleClearFilter}
          // activate={
          //   filterValues.type ||
          //   filterValues.plotNo ||
          //   filterValues.town ||
          //   filterValues.contact ||
          //   filterValues.freelancer
          // }
          // townDropdownList={townDropdownList}
          // contactDropdownList={contactDropdownList}
          // freelancerDropdownList={freelancerDropdownList}
          />
        )}
      </Box>
      <Box component="div" my={2}>
        <UserTable rows={userList?.data} />
        {userList && (
          <CustomPagination
            data={userList}
            getList={getUserListing}
            pageRange={range}
            setPageRange={setRange}
          />
        )}
      </Box>
    </PageContainer>
  );
};

export default UsersListing;
