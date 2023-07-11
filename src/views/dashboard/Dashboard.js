import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { localStorageKeys } from 'src/utils/helpers';
import { getAuthorization } from './dashboardHelpers';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  useMemo(() => {
    const getAuth = async () => await getAuthorization();
    getAuth();
  }, []);
  useEffect(() => {
    const localUser = localStorage.getItem(localStorageKeys.userObj);
    setUser(JSON.parse(localUser));
  }, []);
  return (
    <PageContainer title="Global Tekmed - Dashboard" description="this is Dashboard">
      {user ? (
        <Typography variant="h2" sx={{ textAlign: 'center', py: 4 }}>
          Welcome{' '}
          <Typography component="span" variant="h2" color="primary">
            {user.first_name} {user.last_name}
          </Typography>{' '}
          ({user.role?.name})
        </Typography>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default Dashboard;
