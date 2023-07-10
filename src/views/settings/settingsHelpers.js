import axios from '../../utils/axios';
import { dispatch } from '../../redux/store';
import { isEmpty } from 'lodash';
import { setRoleList } from '../../redux/slices/users';

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
