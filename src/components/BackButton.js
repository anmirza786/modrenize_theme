import Button from '@mui/material/Button';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router';

const BackButton = () => {
  // variable for using useNavigate
  const navigate = useNavigate();
  // function for going back 1 page / the page we came from / previous page
  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <Button
      size="small"
      color="primary"
      startIcon={<ArrowBackOutlinedIcon />}
      onClick={handleNavigateBack}
      sx={{ fontWeight: '700' }}
    >
      BACK
    </Button>
  );
};

export default BackButton;
