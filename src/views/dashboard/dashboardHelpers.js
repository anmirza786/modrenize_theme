import axios from '../../utils/axios';
import { dispatch } from '../../redux/store';
import { isEmpty } from 'lodash';
import { setUser } from 'src/redux/slices/users';
import { errorToast } from 'src/components/toasts';
import { localStorageKeys } from 'src/utils/helpers';

export const getAuthorization = async () => {
  const { data } = await axios.get(`auth/me/`);
  try {
    if (!isEmpty(data?.data) && data?.status === true) {
      dispatch(setUser(data.data));
      localStorage.setItem(localStorageKeys.userObj, JSON.stringify(data.data));
    }
  } catch (error) {
    errorToast('You are unauthorized!');
    console.error(error);
  }
};
