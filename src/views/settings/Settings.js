import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box, Divider } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
// import BackButton from 'src/components/BackButton';


const Settings = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const localUser = localStorage.getItem('CRM3User');
    setUser(JSON.parse(localUser));
  }, []);
  return (
    <PageContainer title="Global Tekmed - Settings" description="this is Settings page">
      <List component="nav" sx={{ px: 8, py: 3 }}>
        <ListItem
          component="a"
          href="/settings/account-settings"
          secondaryAction={
            <IconButton edge="end" sx={{ color: '#000000' }}>
              <NavigateNextOutlinedIcon />
            </IconButton>
          }
          sx={{ pb: 3 }}
        >
          <ListItemIcon>
            <Box
              component="img"
              src="/settings-account-box-outline.svg"
              alt="logo"
              height={36}
              width={36}
              priority
            />
          </ListItemIcon>
          <Typography variant="h5" component="h5" sx={{ color: '#000000' }}>
            Account Settings
          </Typography>
        </ListItem>
        <Divider sx={{ borderBottomWidth: '1.5px' }} />
        {user?.role?.id === 1 && (
        <>
          <ListItem
            component="a"
            href="/settings/user-listing"
            secondaryAction={
              <IconButton edge="end" sx={{ color: '#000000' }}>
                <NavigateNextOutlinedIcon />
              </IconButton>
            }
            sx={{ py: 3 }}
          >
            <ListItemIcon>
              <PersonAddAltOutlinedIcon style={{ fontSize: '40px', color: '#000000' }} />
            </ListItemIcon>
            <Typography variant="h5" component="h5" sx={{ color: '#000000' }}>
              Users
            </Typography>
          </ListItem>
          <Divider sx={{ borderBottomWidth: '1.5px' }} />
          <ListItem
            component="a"
            href="/settings/role-listing"
            secondaryAction={
              <IconButton edge="end" sx={{ color: '#000000' }}>
                <NavigateNextOutlinedIcon />
              </IconButton>
            }
            sx={{ py: 3 }}
          >
            <ListItemIcon>
              <Box component="img" src="/roles.svg" alt="logo" height={36} width={36} priority />
            </ListItemIcon>
            <Typography variant="h5" component="h5" sx={{ color: '#000000' }}>
              Roles
            </Typography>
          </ListItem>
          <Divider sx={{ borderBottomWidth: '1.5px' }} />
        </>
        )}
      </List>
    </PageContainer>
  );
};

export default Settings;
