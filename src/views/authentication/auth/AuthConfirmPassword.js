import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles.css';
// import useSelector
// import { confirmOTP } from './AuthHelpers';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
// import { useRouter } from 'next/navigation';

const AuthConfirmPassword = ({ subtext, token, infotext }) => {
  // const route = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const body = {
      token,
      password,
    };
    setLoading(true);
    try {
      // const response = await resetPasswordConfirm(body);
      // if (response) {
      //   route.push('/authentication/login');
      // }
    } catch (e) {
    } finally {
      setLoading(false);
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
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          // href="/"
          type="submit"
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default AuthConfirmPassword;
