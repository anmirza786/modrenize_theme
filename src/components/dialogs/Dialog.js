import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { setIsOpen } from 'src/redux/slices/dialogs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from 'src/views/settings/user-listing/userListingApi';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, pt: 1, textAlign: 'center' }} {...other}>
      {children}
    </DialogTitle>
  );
}
export default function CustomizedDialogs(props) {
  const { title, dialogText, buttonText, data } = props;
  const isOpen = useSelector((state) => state.Dialogs.isOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  const handleConfirmation = async (arg) => {
    const resp = await deleteUser(arg);

    if (resp) {
      data.api.applyTransaction({ remove: [data.data] });
      dispatch(setIsOpen(false));
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 0, pt: 2, textAlign: 'center', fontSize: 5 }}>
          <ErrorOutlineOutlinedIcon color="error" sx={{ fontSize: '50px' }} />
        </DialogTitle>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent sx={{ px: 4 }}>
          <Typography>{dialogText}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {/* <Button variant="outlined" color="secondary" autoFocus onClick={handleClose}>
            Cancel
          </Button> */}
          <Button
            variant="contained"
            color="error"
            sx={{ fontWeight: '700 !important' }}
            onClick={() => handleConfirmation(data.data.id)}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
