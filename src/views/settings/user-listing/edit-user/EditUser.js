import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PageContainer from 'src/components/container/PageContainer';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CustomSwitch from '../add-user/CustomSwitch';
import { Autocomplete, TextField } from '@mui/material';
import { updateUser, getUser } from './editUserApi';
import { roleSelectList } from '../../settingsHelpers';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import BackButton from 'src/components/BackButton';
import {
  CustomInputLabel,
  BootstrapInput,
} from 'src/components/forms/theme-elements/BootstrapInput';
import { useLocation, useNavigate } from 'react-router';

const EditUser = () => {
  const [roleValue, setRoleValue] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [active, setActive] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get('userId');
  const navigate = useNavigate();
  const userId = parseInt(user ?? '1');
  const populateUserRoles = useCallback(async () => {
    const body = {
      page_size: 100,
      name: '',
    };
    await roleSelectList(body);
  }, []);

  useEffect(() => {
    populateUserRoles();
  }, [populateUserRoles]);

  const roleList = useSelector((state) => state.User.userRoles);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleUserData = await getUser(userId);
        setEmail(singleUserData.email);
        setFirstName(singleUserData.first_name);
        setLastName(singleUserData.last_name);
        setActive(singleUserData.is_active);
        setRoleValue(singleUserData.role.name);
        setRoleId(singleUserData.role.id);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, [roleList, userId]);

  const handlesubmit = async (event) => {
    event.preventDefault();
    const formBody = {
      email: event.target.email.value,
      first_name: event.target.firstname.value,
      last_name: event.target.lastname.value,
      role: roleId,
      is_active: active,
    };
    setLoading(true);
    try {
      const response = await updateUser(formBody, userId);
      if (response) {
        navigate(-1);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageContainer title="Global Tekmed - Users" description="this is user listing page">
      <Box component="form" id="createUser" onSubmit={handlesubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box component="div">
            <BackButton />
            <Typography variant="h3">Edit User</Typography>
          </Box>
          <Box component="div" display="flex">
            <Button
              size="large"
              type="reset"
              color="secondary"
              variant="outlined"
              disabled={loading}
              onClick={() => navigate(-1)}
              sx={{ mr: 2, fontWeight: '700', color: '#000000' }}
            >
              Cancel
            </Button>
            <Button
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              startIcon={<CheckOutlinedIcon />}
              sx={{ fontWeight: '700' }}
            >
              Update User
            </Button>
          </Box>
        </Box>
        <Box sx={{ border: '1px solid #EAEAEF', p: 3, my: 4 }}>
          <Typography sx={{ my: 2 }} variant="h5">
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="firstname">
                First Name*
              </CustomInputLabel>
              <BootstrapInput
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="lastname">
                Last Name*
              </CustomInputLabel>
              <BootstrapInput
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="email">
                Email*
              </CustomInputLabel>
              <BootstrapInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="password2">
                Status
              </CustomInputLabel>
              <CustomSwitch setActive={setActive} active={active} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ border: '1px solid #EAEAEF', p: 3 }}>
          <Typography sx={{ my: 2 }} variant="h5">
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="roles">
                User Roles*
              </CustomInputLabel>
              {roleList ? (
                <Autocomplete
                  disablePortal
                  id="roles"
                  value={roleValue}
                  onChange={(event, newValue) => {
                    setRoleValue(newValue);
                    console.log(event);
                    setRoleId(newValue.id);
                  }}
                  options={roleList}
                  renderInput={(params) => (
                    <TextField {...params} label="Role" autoComplete="false" required />
                  )}
                />
              ) : (
                <BootstrapInput disabled={true} placeholder="Role" />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default EditUser;
