import axios from "src/utils/axios";
import { dispatch } from "src/redux/store";
import { isEmpty } from "lodash";
import { setUserList } from "src/redux/slices/users";
import { toast } from "react-hot-toast";

export const getUserListing = async (data) => {
  try {
    const response = await axios.post(`api/user-listing/?page=${data.page}`, {
      page_size: data.page_size ?? 10,
    });
    if (!isEmpty(response?.data) && response?.status === 200) {
      const resData = {
        totalCount: response.data.count ?? 0,
        next: response.data.next ?? null,
        previous: response.data.previous ?? null,
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
  }
};

export const deleteUser = async (promise, userId) => {
  toast.loading("Deleting . . .", {
    id: "loader",
  });
  try {
    const response = await axios.delete(`api/user-actions/${userId}/`);
    // return response;
    if (response && response.status === 204) {
      toast.success("deleted");
    }
  } catch (error) {
    console.error(error);
    toast.error("aw snap! something went wrong");
  } finally {
    toast.dismiss("loader");
    return promise("close");
  }
};
