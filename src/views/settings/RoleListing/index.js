'use client';
// import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageContainer from 'src/components/container/PageContainer';
import CustomPagination from 'src/components/tables/CustomPagination';
import { RoleTable } from './RoleTable';
import BackButton from 'src/components/BackButton';
import { useCallback, useEffect, useState } from 'react';
import { getUserRoleListing } from '../settingsHelpers';
// import { useAppSelector } from 'src/redux/store';
import { useSelector } from 'react-redux';

const RoleListing = () => {
  const populateRole = useCallback(async () => {
    getUserRoleListing({ page: 1 });
  }, []);
  const [range, setRange] = useState(10);

  useEffect(() => {
    populateRole();
  }, [populateRole]);

  const roleList = useSelector((state) => state.User.roleList);
  return (
    <PageContainer title="Global Tekmed - Roles" description="this is roles listing page">
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Box component="div">
          <BackButton />
          <Typography variant="h3">Roles</Typography>
          <Typography variant="body1" color="GrayText">
            All the roles who have different permissions
          </Typography>
        </Box>
        {/* <Box component="div">
          <Button
            size="large"
            component="a"
            href="/"
            color="primary"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add Role
          </Button>
        </Box> */}
      </Box>
      <Box component="div">
        <RoleTable rows={roleList?.data} />
        {roleList && (
          <CustomPagination
            data={roleList}
            getList={getUserRoleListing}
            pageRange={range}
            setPageRange={setRange}
          />
        )}
      </Box>
    </PageContainer>
  );
};

export default RoleListing;
