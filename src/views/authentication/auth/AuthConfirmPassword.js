import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
// import useSelector
// import { confirmOTP } from './AuthHelpers';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
// import { useRouter } from 'next/navigation';

const AuthConfirmPassword = ({ subtext, token, infotext }) => {
  // const route = useRouter();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const body = {
      token,
      password,
    };
    console.log(body);
    setLoading(true);
    try {
      // const response = await resetPasswordConfirm(body);
      // if (response) {
      //   navigate('/authentication/login');
      // }
    } catch (e) {
    } finally {
      // setLoading(false);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {subtext}
      {infotext}

      <Stack pt={3} pb={4}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            variant="outlined"
            name="password"
            id="password"
            fullWidth
            type="password"
          />
        </Box>
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
          Change Password
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AuthConfirmPassword;
