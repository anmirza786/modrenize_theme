import axios from 'src/utils/axios';
import { errorToast, successToast } from 'src/components/toasts';

export const updateUser = async (body, userId) => {
  try {
    const { data } = await axios.put(`api/user-actions/${userId}/`, JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
      return true;
    } else {
      if (data.errors) {
        data.errors.map((err) => errorToast(err));
      } else {
        errorToast(data.message);
      }
    }
    return false;
  } catch (error) {
    errorToast(error.message);
    console.error(error);
    return null;
  }
};

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`api/user-actions/${userId}/`);
    return data;
  } catch (error) {
    errorToast(error.message);
    return null;
  }
};
