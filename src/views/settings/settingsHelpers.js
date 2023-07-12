import axios from '../../utils/axios';
import { dispatch, getState } from '../../redux/store';
import { isEmpty } from 'lodash';
import { setLoading, setRoleList, setUser, setUserRoles } from '../../redux/slices/users';
import { errorToast, successToast } from '../../components/toasts/index';
import { localStorageKeys } from 'src/utils/helpers';

export const getUserRoleListing = async (data) => {
  const response = await axios.post(`api/role-listing/?page=${data.page}`, {
    page_size: data.page_size ?? 10,
  });
  dispatch(setLoading(true));
  try {
    if (!isEmpty(response?.data) && response?.status === 200) {
      const resData = {
        totalCount: response.data.count ?? 0,
        next: response.data.next ?? null,
        previous: response.data.previous ?? null,
        data: response.data.results.map((d) => ({
          id: d.id,
          name: d.name,
          description: d.description,
          userCount: d.user_count,
        })),
      };
      dispatch(setRoleList(resData));
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const userUpdate = async (body) => {
  try {
    const { data } = await axios.put('/auth/update/', body, {
      rawRequest: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data.status === true) {
      dispatch(setUser(data.data));
      successToast(data.message);
      localStorage.setItem(localStorageKeys.userObj, JSON.stringify(data.data));
      return true;
    } else {
      errorToast(data.message);
      return true;
    }
  } catch (error) {
    errorToast(error.message);
    return true;
  }
};
export const roleSelectList = async (body) => {
  if (!getState().User.userRoles) {
    try {
      const response = await axios.post(`api/role-listing/`, JSON.stringify(body));

      if (!isEmpty(response?.data) && response?.status === 200) {
        const resData = response.data.results.map((d) => ({
          id: d.id,
          label: d.name,
          description: d.description,
        }));
        dispatch(setUserRoles(resData));
      }
    } catch (error) {
      // message = "something went wrong"
      console.error(error);
    }
  }
};
