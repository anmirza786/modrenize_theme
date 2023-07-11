import axios from '../../utils/axios';
import { dispatch } from '../../redux/store';
import { isEmpty } from 'lodash';
import { setRoleList } from '../../redux/slices/users';
import { errorToast, successToast } from '../../components/toasts/index';


export const getUserRoleListing = async (data) => {
  const response = await axios.post(`api/role-listing/?page=${data.page}`, {
    page_size: data.page_size ?? 10,
  });
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
        })),
      };
      dispatch(setRoleList(resData));
    }
  } catch (error) {
    console.error(error);
  }
};

export const userUpdate = async (body) => {
  console.log('body : ', body)
  try {
    const { data } = await axios.put('/auth/update/', body, {
      rawRequest: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data.status === true) {
      successToast(data.message);
      localStorage.setItem('CRM3User', JSON.stringify(data.data));
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
