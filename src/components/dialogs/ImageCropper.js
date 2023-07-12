import { useState } from 'react';
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
import { deleteUser } from 'src/views/settings/user-listing/userListingApi';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Box } from '@mui/system';

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
  const { imageToCrop, croppedImage,inputFile, data } = props;
  const [crop, setCrop] = useState({
    maxHeight: 800,
    maxWidth: 400,
  });
  const [image, setImage] = useState(null);
  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    var base64Image
    console.log(canvas)
    

     new Promise((reject, resolve) => {
        canvas.toDataURL("image1/jpeg");
      });
    // const blob = new Blob(base64Image);
    var url = base64Image;

    fetch(url)
      .then((res) => res.blob())
      .then(console.log);
    // croppedImage(base64Image);
  };

  const isOpen = useSelector((state) => state.Dialogs.imageDialog);
  console.log('image dialog state : ', isOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setImageDialog(false));
  };

  const handleConfirmation = async (arg) => {
    const resp = await new Promise((resolve, reject) => {
      deleteUser(resolve, arg);
    });
    if (resp) {
      data.api.applyTransaction({ remove: [data.data] });
      dispatch(setImageDialog(false));
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          crop or upload new image
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Image Dialog</Typography>
          <Box component="div">
            {imageToCrop && (
              <Box component="div">
                <ReactCrop
                  src={imageToCrop}
                  onImageLoaded={setImage}
                  maxHeight={400}
                  maxWidth={400}
                  crop={crop}
                  onChange={setCrop}
                />
                {/* <img src={imageToCrop} alt='img' /></ReactCrop> */}
                <br />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={cropImageNow}
          >
            Crop
          </Button>
          <Button
            variant="contained"
            color="primary"
                onClick={() => inputFile.current.click()}
            // onClick={() => handleConfirmation(data.data.id)}
          >
            Upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
