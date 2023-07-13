import { useState, useRef } from 'react';
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
import { Box } from '@mui/material';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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
// function base64ToFile(base64Data, filename) {
//   const arr = base64Data.split(',');
//   const mimeType = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mimeType });
// }
export default function CustomizedDialogs(props) {
  const { imageToCrop, inputFile } = props;

  const cropperRef = useRef(null);
  const [croppedImg, setCroppedImg] = useState('');
  const onCrop = () => {
    console.log(croppedImg);
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImg(cropper.getCroppedCanvas().toDataURL());
  };
  // const [crop, setCrop] = useState({
  //   maxHeight: 800,
  //   maxWidth: 400,
  // });
  // const [image, setImage] = useState(null);
  // const cropImageNow = () => {
  //   const canvas = document.createElement('canvas');
  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext('2d');

  //   const pixelRatio = window.devicePixelRatio;
  //   canvas.width = crop.width * pixelRatio;
  //   canvas.height = crop.height * pixelRatio;
  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = 'high';

  //   ctx.drawImage(
  //     image,
  //     (image.crossOrigin = 'anonymous'),
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height,
  //   );
  //   canvas.toBlob((blob) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64Data = reader.result;
  //       const file = base64ToFile(base64Data, imageToCrop.name);
  //       console.log('New File:', file);
  //       croppedImage(file);
  //     };
  //     reader.readAsDataURL(blob);
  //   }, 'image/png');
  // };

  const isOpen = useSelector((state) => state.Dialogs.imageDialog);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setImageDialog(false));
  };

  // const handleConfirmation = async (arg) => {
  //   const resp = await new Promise((resolve, reject) => {
  //     deleteUser(resolve, arg);
  //   });
  //   if (resp) {
  //     data.api.applyTransaction({ remove: [data.data] });
  //     dispatch(setImageDialog(false));
  //   }
  // };

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
                <Cropper
                  src={imageToCrop}
                  style={{ height: 500, width: '100%' }}
                  // initialAspectRatio={16 / 9}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                  // viewMode={1}
                  // guides={true}
                  // minCropBoxHeight={10}
                  // minCropBoxWidth={10}
                  // background={false}
                  responsive={true}
                  // autoCropArea={1}
                  // aspectRatio={4 / 3}
                  // checkOrientation={false}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
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
