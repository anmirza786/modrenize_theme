import axios from '@/utils/axios';
import { getState, dispatch } from '@/redux/store';
import { setUser, setUserId } from '@/redux/slices/users';
import { errorToast, successToast } from '../../components/toasts';

export const login = async (body) => {
  try {
    const { data } = await axios.post('/auth/login/', JSON.stringify(body));
    if (data.status === true) {
      dispatch(setUserId(data.user_id));
      localStorage.setItem('userId', data.user_id);
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return null;
  }
};

export const confirmOTP = async (body) => {
  try {
    const { data } = await axios.post('/auth/otp/', JSON.stringify(body));
    if (data.status === true) {
      dispatch(setUser(data.user));
      localStorage.setItem('CRM3Token', data.token);
      localStorage.setItem('CRM3User', JSON.stringify(data.user));
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post('/auth/logout/');
    localStorage.removeItem('CRM3Token');
    localStorage.removeItem('CRM3User');
    successToast('Logout Successful');
    return true;
  } catch (error) {
    errorToast(error.message);
    localStorage.removeItem('CRM3Token');
    localStorage.removeItem('CRM3User');
    return null;
  }
};

export const resetPasswordRequest = async (body) => {
  try {
    const { data } = await axios.post('/auth/password-reset/request/', JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message);
      return false;
    }
  } catch (error) {
    errorToast(error.message);
    return null;
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
    return null;
  }
};
