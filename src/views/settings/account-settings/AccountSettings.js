import { useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import BackButton from "../../components/BackButton";
import { errorToast } from "../../components/toasts";
import {
  CustomInputLabel,
  BootstrapInput,
} from "@/app/(DashboardLayout)/components/forms/theme-elements/BootstrapInput";
import { userUpdate } from "../SettingsHelper";
import { MuiTelInput } from "mui-tel-input";
import { Avatar, Badge } from "@mui/material";
import { useRouter } from "next/navigation";


const AccountSettings = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<any | null>(null);
  const [profileImageBlob, setProfileImageBlob] = useState<any | null>(null);

  const inputFile = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = () => {
    const storedUser = window.localStorage.getItem("CRM3User");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setFirstname(u.first_name);
      setLastname(u.last_name);
      setEmail(u.email);
    }
  };

  const handleImageUpload = (e) => {
    console.log("e.target.files[0] : ", e.target.files);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setProfileImageBlob(e.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password1 && (password1.length < 8 || password1 !== password2)) {
      errorToast(
        password1.length < 8
          ? "The password must be at least 8 characters."
          : "The password did not match to confirm password."
      );
      return;
    }

    const body1 = {
      first_name: firstname,
      last_name: lastname,
      email: email,
    };

    if (!password1) {
      if (isEqual(body1, user)) {
        return;
      }
    }

    const formData = new FormData();
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);

    if (password1) {
      // body.password = password1;
      formData.append("password", password1);
    }

    if (phone) {
      formData.append("phone", phone);
      // body.phone = phone;
    }

    if (address) {
      formData.append("address", address);
      // body.address = address;
    }

    if (profileImageBlob) {
      formData.append("avatar", profileImageBlob[0]);
      // body.profileImage = profileImage
    }

    const body = formData;

    setIsLoading(true);

    try {
      await userUpdate(body);
    } catch (error) {
      errorToast("An error occurred while updating the user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      title="Global Tekmed - Update User"
      description="this is user settings page"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box component="div">
            <BackButton />
            <Typography variant="h3">Account Settings</Typography>
          </Box>
          <Box component="div" display="flex">
            <Button
              size="medium"
              type="reset"
              color="secondary"
              variant="outlined"
              disabled={isLoading}
              onClick={() => router.back()}
              sx={{ mr: 2, fontWeight: "700", color: "#000000" }}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<CheckOutlinedIcon />}
              disabled={isLoading}
              sx={{ fontWeight: "700" }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Box sx={{ border: "1px solid #EAEAEF", p: 3, my: 4 }}>
          <Typography sx={{ my: 2 }} variant="h5">
            Basic Details
          </Typography>
          <input
            type="file"
            id="file"
            accept="image/*"
            multiple={false}
            ref={inputFile}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <Grid
            container
            alignItems="center"
            sx={{ py: "25px", gap: { xs: 1, md: 0 } }}
          >
            <Grid item xs={12} md={1}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ cursor: "pointer" }}
                onClick={() => inputFile.current.click()}
                badgeContent={
                  <Box
                    component={"img"}
                    height={"20px"}
                    width={"20px"}
                    src="/images/plus.svg"
                    alt="+"
                  />
                }
              >
                <Avatar
                  sx={{ height: "80px", width: "80px" }}
                  alt="Travis Howard"
                  src={profileImage ?? "/images/profile/Oval.png"}
                  // "/images/profile/Oval.png"
                />
              </Badge>
            </Grid>
            <Grid item xs={12} md={11}>
              <Button
                size="medium"
                color="secondary"
                variant="outlined"
                disabled={isLoading}
                onClick={() => setProfileImage([])}
                sx={{
                  fontWeight: "700",
                  color: "#666687",
                  backgroundColor: "#eaeaef",
                  ml: { xs: 0, md: 6 },
                }}
              >
                delete
              </Button>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                disabled={isLoading}
                onClick={() => inputFile.current.click()}
                sx={{ ml: 2, fontWeight: "700" }}
              >
                Upload New
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="firstname">
                First Name*
              </CustomInputLabel>
              <BootstrapInput
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                id="firstname"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="lastname">
                Last Name*
              </CustomInputLabel>
              <BootstrapInput
                required
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="email">
                Email*
              </CustomInputLabel>
              <BootstrapInput
                required
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="email">
                Phone Number
              </CustomInputLabel>
              <MuiTelInput
                // defaultCountry="US"
                // label={'phone'}
                inputProps={{ style: { height: "12px" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #E0E3E7",
                    "&:hover fieldset": {
                      border: "1px solid #E0E3E7",
                    },
                    "&:focus fieldset": {
                      border: "1px solid #E0E3E7",
                    },
                  },
                }}
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="email">
                Address
              </CustomInputLabel>
              <BootstrapInput
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ border: "1px solid #EAEAEF", p: 3, my: 4 }}>
          <Typography sx={{ my: 2 }} variant="h5">
            Change Passowrd
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="password1">
                New Password*
              </CustomInputLabel>
              <BootstrapInput
                // required
                id="password1"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputLabel shrink htmlFor="password2">
                Confirm Password*
              </CustomInputLabel>
              <BootstrapInput
                // required
                id="password2"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AccountSettings;
