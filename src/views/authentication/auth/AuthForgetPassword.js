import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

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
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          disabled={loading}
          // href="/"
          type="submit"
        >
          Request Password Change
        </Button>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthForgetPassword;
