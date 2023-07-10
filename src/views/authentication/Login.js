import React from 'react';
import { Grid, Box, Card, Typography, Button } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Login2 = () => {
  return (
    <PageContainer title="Global Tekmed - Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={9}
              sx={{
                px: 10,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="div">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <AuthLogin
                  subtext={
                    <Typography
                      variant="h2"
                      textAlign="center"
                      color="#32324D"
                      fontSize={32}
                      fontWeight={700}
                      pt={2}
                      mb={1}
                    >
                      Welcom Back!
                    </Typography>
                  }
                  infotext={
                    <Typography
                      variant="subtitle2"
                      textAlign="center"
                      color="#666687"
                      fontSize={24}
                      fontWeight={400}
                      mb={1}
                    >
                      Please input your information in the fields below to enter your Journey
                      platform.
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={6}
            sx={{ display: { xs: 'none', md: 'block' } }}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="div"
              sx={{
                height: '100vh',
                background: '#0294D3',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/images/auth/Ellipse 2.png"
                alt="stag1"
                sx={{ position: 'absolute', top: 0, right: 0, width: '40%' }}
              />
              <Box
                component="img"
                src="/images/auth/Ellipse 1.png"
                alt="stag2"
                sx={{ position: 'absolute', bottom: 0, left: 0, width: '60%' }}
              />
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '20%',
                  color: '#ffffff',
                }}
              >
                <Typography variant="h4" textAlign="left" fontSize={24} fontWeight={400} mb={1}>
                  {"What's New?"}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={1.5}>
                    <InfoOutlinedIcon style={{ fontSize: '45px' }} />
                  </Grid>
                  <Grid item xs={10.5}>
                    <Typography variant="body2">New Module</Typography>
                    <Typography variant="h6" sx={{ fontSize: '14px' }}>
                      Go4Clients - Send a SMS
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={1.5}>
                    <InfoOutlinedIcon style={{ fontSize: '45px' }} />
                  </Grid>
                  <Grid item xs={10.5}>
                    <Typography variant="body2">New Module</Typography>
                    <Typography variant="h6" sx={{ fontSize: '14px' }}>
                      Go4Clients - Send an Email
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={1.5}>
                    <InfoOutlinedIcon style={{ fontSize: '45px' }} />
                  </Grid>
                  <Grid item xs={10.5}>
                    <Typography variant="body2">New Module</Typography>
                    <Typography variant="h6" sx={{ fontSize: '14px' }}>
                      Go4Clients - Initiate a DRIP (Automation) with a SMS
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  sx={{
                    border: '1px solid white',
                    borderRadius: '5px',
                    color: 'white',
                    outlite: 1,
                    mt: 2,
                    ml: 2,
                  }}
                >
                  See More
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
