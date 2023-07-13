import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { IconUser } from '@tabler/icons';
import { logout } from 'src/views/authentication/AuthHelpers';
import { localStorageKeys } from 'src/utils/helpers';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      navigate('/auth/login');
    }
  };
  const userData = useSelector((state) => state.User.user);
  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem(localStorageKeys.userObj));
    setUser(newUser);
  }, [userData]);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        // sx={{
        //   ...(typeof anchorEl2 === 'object' && {
        //     color: 'primary.main',
        //   }),
        // }}
        disableRipple
        onClick={handleClick2}
      >
        {user && (
          <>
            <Avatar
              src={`${user?.avatar}`}
              alt={user.first_name}
              sx={{
                width: 35,
                height: 35,
              }}
            />
            <Typography variant="body1" sx={{ color: '#000000', ml: 1 }}>
              {user.first_name ?? 'Profile'}
            </Typography>
            <KeyboardArrowDownIcon />
          </>
        )}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}
        <Box mt={1} py={1} px={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Sign Out
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
