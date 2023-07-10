import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';

const AuthForgetPassword = ({ title, subtitle, subtext, infotext }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setLoading(true);
    try {
      // await resetPasswordRequest({ email });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      {infotext}

      <Stack pt={3} pb={4}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField variant="outlined" id="email" name="email" type="eamil" fullWidth />
        </Box>
      </Stack>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        <Typography fontWeight="500">Remember the password?</Typography>
        <Typography
          component={Link}
          to="/auth/login"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            cursor: 'pointer',
            zIndex: '10000',
          }}
        >
          Login!
        </Typography>
      </Stack>
      <Box>
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          loading={loading}
          loadingIndicator="Submitting..."
          type="submit"
        >
          Request Password Change
        </LoadingButton>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthForgetPassword;
