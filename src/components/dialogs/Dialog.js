import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'src/views/settings/user-listing/userListingApi';
import { setIsOpen } from 'src/redux/slices/dialogs';

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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const CustomizedDialogs = ({ title, dialogText, buttonText, data, isOpen }) => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setIsOpen(false));
  }, [dispatch]);

  const handleConfirmation = useCallback(
    async (arg) => {
      const resp = await new Promise((resolve, reject) => {
        deleteUser(resolve, arg);
      });
      if (resp) {
        data.api.applyTransaction({ remove: [data.data] });
        dispatch(setIsOpen(false));
      }
    },
    [data.api, data.data, dispatch],
  );

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{dialogText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={() => handleConfirmation(data.data.id)}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default CustomizedDialogs;
