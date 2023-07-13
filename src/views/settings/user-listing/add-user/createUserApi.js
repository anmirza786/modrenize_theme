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
        return true;
      } else {
        errorToast(data.message);
        return false;
      }
    }
  } catch (error) {
    errorToast(error.message);
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};
