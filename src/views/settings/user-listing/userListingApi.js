import axios from 'src/utils/axios';
import { dispatch } from 'src/redux/store';
import { isEmpty } from 'lodash';
import { setLoading, setUserList } from 'src/redux/slices/users';
import { toast } from 'react-hot-toast';
import { errorToast, successToast } from 'src/components/toasts';

export const getUserListing = async (data) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`api/user-listing/?page=${data.page}`, {
      page_size: data.page_size ?? 10,
      search: data.search ?? null,
      is_active: data.is_active ?? null,
      role: data.role ?? null,
    });
    if (!isEmpty(response?.data) && response?.status === 200) {
      const resData = {
        totalCount: response.data.count ?? 0,
        next: response.data.next ?? null,
        previous: response.data.previous ?? null,
        totalPages: response.data.total_pages ?? 1,
        currentPage: response.data.current ?? 1,
        data: response.data.results.map((d) => ({
          email: d.email,
          first_name: d.first_name,
          last_name: d.last_name,
          name: `${d.first_name} ${d.last_name}`,
          id: d.id,
          is_active: d.is_active,
          role: d.role,
        })),
      };
      dispatch(setUserList(resData));
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteUser = async (userId) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(`api/user-actions/${userId}/`);
    // return response;
    if (data.status === true) {
      successToast(data.message);
      return true;
    } else {
      errorToast(data.message ?? 'Something went wrong');
      return false;
    }
  } catch (error) {
    errorToast('Something went wrong');
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};
