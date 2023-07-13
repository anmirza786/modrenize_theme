import { useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { setImageDialog } from 'src/redux/slices/dialogs';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

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
          //   aria-label="close"
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
export default function CustomizedDialogs(props) {
  const { imageToCrop, croppedImage, inputFile, setProfileImage } = props;

  const cropperRef = useRef(null);

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        let file;
        const url = canvas.toDataURL();
        setProfileImage(url);
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            file = new File([blob], 'File name', { type: 'image/png' });
            croppedImage(file);
          });
        dispatch(setImageDialog(false));
      }
    }
  };

  const isOpen = useSelector((state) => state.Dialogs.imageDialog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setImageDialog(false));
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crop or upload new image
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Image Dialog</Typography>
          <Box component="div">
            {imageToCrop && (
              <Box component="div" className="example">
                <Box omponent="div" className="example__cropper-wrapper">
                  <Cropper
                    ref={cropperRef}
                    className="example__cropper"
                    backgroundClassName="example__cropper-background"
                    src={imageToCrop}
                  />
                </Box>
                <br />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onCrop}>
            Crop
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Continue Without Cropping
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => inputFile.current.click()}
            // onClick={() => handleConfirmation(data.data.id)}
          >
            Browse Image
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
