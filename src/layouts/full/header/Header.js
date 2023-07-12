import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';

// components
import Profile from './Profile';
import { IconMenu } from '@tabler/icons';
import { useSelector } from 'react-redux';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  boxShadow: '0px 1px 2px 0px #0303051A',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));
const Header = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const loader = useSelector((state) => state.User.loading);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {loader && (
          <Box>
            <Oval
              height={40}
              width={40}
              color="#0294D3"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#0294D3"
              strokeWidth={8}
              strokeWidthSecondary={5}
            />
          </Box>
        )}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
