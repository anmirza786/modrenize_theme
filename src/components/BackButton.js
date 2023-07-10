'use client';
import Button from '@mui/material/Button';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      color="primary"
      startIcon={<ArrowBackOutlinedIcon />}
      onClick={() => navigate(-1)}
      sx={{ fontWeight: '700' }}
    >
      BACK
    </Button>
  );
};

export default BackButton;
