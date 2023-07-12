import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import PageContainer from 'src/components/container/PageContainer';
import { UserTable } from './UserTable';
import CustomPagination from 'src/components/tables/CustomPagination';
import { getUserListing } from './userListingApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import BackButton from 'src/components/BackButton';
import { useSelector } from 'react-redux';
import Filter from 'src/components/tables/Filters';
import { isEqual } from 'lodash';
import Search from 'src/components/tables/Search';

const UsersListing = () => {
  // ref for fetching data
  const fetchDataParams = useRef();
  // filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRoleFilterValue, setSelectedRoleFilterValue] = useState(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState(null);
  const [selectedStatusFilterValue, setSelectedStatusFilterValue] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  // search state
  const [search, setSearch] = useState('');
  // pagination and page_range/size states
  const [range, setRange] = useState(10);
  // get user list from the redux store
  const userList = useSelector((state) => state.User.userList);
  // Search Functions
  const handleApplySearch = (e) => {
    e.preventDefault();
    populateUsers({ page: 1, search });
  };
  const handleCancelSearch = () => {
    setSearch('');
    populateUsers({ page: 1 });
  };

  // Filter functions
  const handleApplyFilter = (e) => {
    e.preventDefault();
    populateUsers({ page: 1, role: selectedRoleFilter, is_active: selectedStatusFilter });
  };
  const handleCancelFilter = () => {
    setSelectedRoleFilter(null);
    setSelectedRoleFilterValue(null);
    setSelectedStatusFilter(null);
    setSelectedStatusFilterValue(null);
    setFilterOpen(false);
    populateUsers({ page: 1 });
  };

  // User API Callback function
  const populateUsers = useCallback(async (params) => {
    if (isEqual(params, fetchDataParams.current)) {
      return;
    }
    fetchDataParams.current = params;
    getUserListing(params);
  }, []);

  useEffect(() => {
    populateUsers({ page: 1 });
  }, [populateUsers]);

  return (
    <PageContainer title="Global Tekmed - Users" description="This is the user listing page">
      {/* Header Section */}
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
      {/* End - Header Section */}

      {/* Filters & Search Section */}
      <Box component="div" my={2}>
        {!filterOpen ? (
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" justifyContent="start">
              <Search handleApplySearch={handleApplySearch} setSearch={setSearch} search={search} />
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
                  sx={{ color: '#000000', marginRight: 1 }}
                  onClick={handleCancelSearch}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleApplySearch}>
                  Search
                </Button>
              </Stack>
            )}
          </Stack>
        ) : (
          <Filter
            selectedRoleFilterValue={selectedRoleFilterValue}
            selectedStatusFilterValue={selectedStatusFilterValue}
            setSelectedRoleFilter={setSelectedRoleFilter}
            setSelectedRoleFilterValue={setSelectedRoleFilterValue}
            setSelectedStatusFilter={setSelectedStatusFilter}
            setSelectedStatusFilterValue={setSelectedStatusFilterValue}
            applyFilter={handleApplyFilter}
            cancelFilter={handleCancelFilter}
          />
        )}
      </Box>
      {/* End - Filters & Search Section */}

      {/* Table & Pagination Section */}
      <Box component="div" my={2}>
        {/* Table */}
        <UserTable rows={userList?.data} />
        {/* Custom Pagination */}
        {userList && (
          <CustomPagination
            data={userList}
            getList={getUserListing}
            pageRange={range}
            setPageRange={setRange}
          />
        )}
      </Box>
      {/* End - Table & Pagination Section */}
    </PageContainer>
  );
};

export default UsersListing;
