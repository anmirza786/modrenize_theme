import axios from 'axios';
import { get } from 'lodash';
import { localStorageKeys } from './helpers';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;

axiosInstance.interceptors.request.use(
  (axiosConfig) => {
    const authToken = localStorage.getItem(localStorageKeys.authToken);
    if (authToken) {
      axiosConfig.headers['Authorization'] = `Token ${authToken}`;
    }
    if (axiosConfig?.rawRequest) {
      // header for file_upload, video/audio will handle here i.e raw requests
    } else {
      axiosConfig.headers['Content-Type'] = 'application/json';
    }
    // axiosConfig.headers["Content-Type"] = "application/json";
    return axiosConfig;
  },
  (error) => {
    Promise.reject(error);
  },
);

/*
  Response Interceptor
  Responsibilities:
  1- If api sends 401 token then send user to login page
*/
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (get(error, 'response.status', '') === 401) {
      localStorage.clear();
      window.location.reload();
      return;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
