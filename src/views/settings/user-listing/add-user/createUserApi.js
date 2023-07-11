import axios from "../../../../utils/axios";
import { dispatch } from "../../../../redux/store";
import { isEmpty } from "lodash";
import { setUserRoles } from "../../../../redux/slices/users";
import {
  errorToast,
  successToast,
} from '../../../../components/toasts/index';

export const createUser = async (body) => {
  try {
    const { data } = await axios.post(`api/create-user/`, JSON.stringify(body));
    if (data.status === true) {
      successToast(data.message);
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    errorToast(error.message);
    console.error(error);
  } finally {
    return true;
  }
};

export const getUserRoles = async (body, promise) => {
  // let message = ''
  try {
    const response = await axios.post(
      `api/role-listing/`,
      JSON.stringify(body)
    );

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
  } finally {
    promise();
  }
};
