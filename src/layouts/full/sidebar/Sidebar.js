import { useMediaQuery, Box, Drawer, Divider, Typography } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import SidebarLogo from './sidebarLogo'
const Sidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = '270px';

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={8} py={1}>
              <SidebarLogo />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Box>
          <Box>
            <Divider />
            <Box
              display={"flex"}
              alignItems="center"
              px={4}
              py={5}
              // onClick={async () => await handleLogout()}
            >
              <Box
                component="img"
                src="/logoutIcon.svg"
                alt="logout"
                height={15.6}
                width={15.6}
                style={{
                  marginTop: "2px",
                }}
              />
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  color: "#8E8EA9",
                  mt: "2px",
                  ml: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={8}>
      <SidebarLogo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      <Box>
        <Divider />
        <Box
          display={"flex"}
          alignItems="center"
          px={4}
          py={5}
          // onClick={async () => await handleLogout()}
        >
          <Box
            component="img"
            src="/logoutIcon.svg"
            alt="logout"
            height={15.6}
            width={15.6}
            style={{
              marginTop: "2px",
            }}
            // onClick={async () => await handleLogout()}
          />
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: "#8E8EA9",
              mt: "2px",
              ml: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
