import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: 16,
  color: '#000000',
}));

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  margin: '20px 0',
  'label + &': {
    marginTop: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? 'transparent' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
  },
}));
