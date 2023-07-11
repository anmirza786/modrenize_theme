// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PageContainer from 'src/components/container/PageContainer';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { UserTable } from "./UserTable";
// import { UserTableRows } from '@/utils/constants';
import CustomPagination from 'src/components/tables/CustomPagination';
import { getUserListing } from "./userListingApi";
import { useCallback, useEffect, useState } from "react";
import BackButton from 'src/components/BackButton';
import { useSelector } from "react-redux";

const UsersListing = () => {
  const populateUsers = useCallback(async () => {
    getUserListing({ page: 1 });
  }, []);
  const [range, setRange] = useState(10);

  useEffect(() => {
    populateUsers();
  }, [populateUsers]);

  const userList = useSelector ((state) => state.User.userList);

  return (
    <PageContainer
      title="Global Tekmed - Users"
      description="this is user listing page"
    >
      <Box
        component="div"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
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
      <Box component="div">
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
