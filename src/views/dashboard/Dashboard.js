import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components

const Dashboard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const localUser = localStorage.getItem('CRM3User');
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
          ({user.role.name})
        </Typography>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default Dashboard;
