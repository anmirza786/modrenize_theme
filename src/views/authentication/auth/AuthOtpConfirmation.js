import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import '../styles.css';
// import useSelector
// import { confirmOTP } from './AuthHelpers';
// import { useRouter } from 'next/navigation';

const AuthOTPConfirmation = ({ title, subtitle, subtext, infotext }) => {
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState('');
  // const userID = useSelector((state) => state.User.userId);
  // const route = useRouter();
  const handleChange = (OTP) => {
    setOTP(OTP);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      user_id: localStorage.getItem('userId'),
      code: OTP,
    };
    setLoading(true);
    try {
      // await confirmOTP(body);
      // route.push('/');
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
        <Box sx={{ zIndex: 100000 }}>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle="inputStyle"
            containerStyle={{
              justifyContent: 'space-between',
            }}
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
          disabled={loading}
          type="submit"
        >
          Verify
        </Button>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthOTPConfirmation;
