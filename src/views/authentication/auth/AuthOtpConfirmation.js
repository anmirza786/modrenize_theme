import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import OTPInput from 'react-otp-input';
import '../styles.css';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { confirmOTP } from '../AuthHelpers';

const AuthOTPConfirmation = ({ title, subtitle, subtext, infotext }) => {
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState('');
  const userID = useSelector((state) => state.User.userId);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      user_id: localStorage.getItem('userId') || userID,
      code: OTP,
    };
    setLoading(true);
    try {
      const resp = await confirmOTP(body);
      if (resp) {
        navigate('/');
      }
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
        <Box sx={{ zIndex: 10 }}>
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
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          loading={loading}
          loadingIndicator="Submitting..."
          type="submit"
        >
          Verify
        </LoadingButton>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthOTPConfirmation;
