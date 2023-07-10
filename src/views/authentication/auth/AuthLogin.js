import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Stack, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';
import { login } from '../AuthHelpers';

const AuthLogin = ({ title, subtitle, subtext, infotext }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const rememberMe = event.target.rememberMe.checked;
    const body = {
      email,
      password,
    };
    setLoading(true);
    try {
      const response = await login(body);
      if (response) {
        navigate('/auth/otp-confirmation');
      }
    } catch (error) {
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

      <Stack>
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
          <CustomTextField variant="outlined" fullWidth name="email" />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth name="password" />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="rememberMe" />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forget-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              cursor: 'pointer',
              zIndex: '10000',
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
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
          Log In
        </LoadingButton>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;
