import axios from '../../utils/axios';
import { dispatch } from '../../redux/store';
import { setUser, setUserId } from '../../redux/slices/users';
import { errorToast, successToast } from '../../components/toasts';
import { localStorageKeys } from 'src/utils/helpers';

export const login = async (body) => {
  try {
    const { data } = await axios.post('/auth/login/', JSON.stringify(body));
    if (data.status === true) {
      dispatch(setUserId(data.user_id));
      localStorage.setItem(localStorageKeys.userId, data.user_id);
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return false;
  }
};

export const confirmOTP = async (body) => {
  try {
    const { data } = await axios.post('/auth/otp/', JSON.stringify(body));
    if (data.status === true) {
      dispatch(setUser(data.user));
      localStorage.setItem(localStorageKeys.authToken, data.token);
      localStorage.setItem(localStorageKeys.userObj, JSON.stringify(data.user));
      // successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return false;
  }
};

export const logout = async () => {
  try {
    await axios.post('/auth/logout/');
    localStorage.removeItem(localStorageKeys.authToken);
    localStorage.removeItem(localStorageKeys.userObj);
    // successToast('Logout Successful');
    return true;
  } catch (error) {
    // errorToast(error.message);
    localStorage.removeItem(localStorageKeys.authToken);
    localStorage.removeItem(localStorageKeys.userObj);
    return false;
  }
};

export const resetPasswordRequest = async (body) => {
  try {
    const { data } = await axios.post('/auth/password-reset/request/', JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
      return true;
    } else {
      if (data.message) {
        errorToast(data.message);
      } else {
        errorToast('Oops! Something went wrong.');
      }
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return false;
  }
};

export const resetPasswordConfirm = async (body) => {
  try {
    const { data } = await axios.post('/auth/password-reset/confirm/', JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return false;
  }
};
