import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PageContainer from "src/components/container/PageContainer";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CustomSwitch from "./CustomSwitch";
import { Autocomplete, TextField } from "@mui/material";
import { createUser, getUserRoles } from "./createUserApi";
import { useCallback, useEffect, useState } from "react";
import BackButton from 'src/components/BackButton';
import {
  CustomInputLabel,
  BootstrapInput,
} from "../../../../components/forms/theme-elements/BootstrapInput";
import { errorToast } from '../../../../components/toasts/index';
import { useSelector } from "react-redux";

const UsersListing = () => {
  const [roleValue, setRoleValue] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const populateUserRoles = useCallback(async () => {
    await new Promise((resolve, reject) => {
      const body = {
        page_size: 20,
        name: "",
      };
      getUserRoles(body, resolve);
    });
  }, []);

  useEffect(() => {
    populateUserRoles();
  }, [populateUserRoles]);

  const roleList = useSelector((state) => state.User.userRoles);
  const handlesubmit = async (event) => {
    event.preventDefault();
    const formBody = {
      email: event.target.email.value,
      first_name: event.target.firstname.value,
      last_name: event.target.lastname.value,
      role: roleId,
      is_active: active,
      password: event.target.password1.value,
    };
    const password2 = event.target.password2.value;
    if (formBody.password.length >= 8 && formBody.password === password2) {
      setLoading(true);
      const response = await createUser(formBody);
      if (response) {
        // router.back();
        setLoading(false);
      }
    } else if (formBody.password.length < 8) {
      errorToast("Password must be of 8 characters");
    } else {
      errorToast("Passwords do not match");
    }
  };
  return (
    <PageContainer
      title="Global Tekmed - Users"
      description="this is user listing page"
    >
      <Box component="form" id="createUser" onSubmit={handlesubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box component="div">
            <BackButton />
            <Typography variant="h3">Add User</Typography>
          </Box>
          <Box component="div" display="flex">
            <Button
              size="large"
              type="reset"
              color="secondary"
              variant="outlined"
              disabled={loading}
              // onClick={() => router.back()}
              sx={{ mr: 2, fontWeight: "700", color: "#000000" }}
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
              sx={{ fontWeight: "700" }}
            >
              Add User
            </Button>
          </Box>
        </Box>
        <Box sx={{ border: "1px solid #EAEAEF", p: 3, my: 4 }}>
          <Typography sx={{ my: 2 }} variant="h5">
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="firstname">
                First Name*
              </CustomInputLabel>
              <BootstrapInput id="firstname" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="lastname">
                Last Name*
              </CustomInputLabel>
              <BootstrapInput id="lastname" required />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="email">
                Email*
              </CustomInputLabel>
              <BootstrapInput id="email" type="email" required />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="password1">
                Password*
              </CustomInputLabel>
              <BootstrapInput id="password1" type="password" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="password2">
                Confirm Password*
              </CustomInputLabel>
              <BootstrapInput id="password2" type="password" required />
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
        <Box sx={{ border: "1px solid #EAEAEF", p: 3 }}>
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
                  onChange={(event ,newValue) => {
                    setRoleValue(newValue);
                    setRoleId(newValue.id);
                  }}
                  options={roleList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      autoComplete="false"
                      required
                    />
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

export default UsersListing;
