import axios from '../../../../utils/axios';
import { dispatch } from '../../../../redux/store';
import { errorToast, successToast } from '../../../../components/toasts/index';
import { setLoading } from 'src/redux/slices/users';

export const createUser = async (body) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(`api/create-user/`, JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
    } else {
      if (data.errors) {
        data.errors.map((error) => errorToast(error));
      } else {
        errorToast(data.message);
      }
    }
  } catch (error) {
    errorToast(error.message);
    console.error(error);
  } finally {
    dispatch(setLoading(false));
    return true;
  }
};
