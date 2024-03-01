import axios from 'axios';

// Set config defaults when creating the instance

export const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.defaults.withCredentials = true;
// Alter defaults after instance has been created

const token = localStorage.getItem('accessToken');
axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
export const updateHeaderToken = (newtoken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${newtoken}`;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) =>
    // Do something before request is sent
    config,
  (error) =>
    // Do something with request error
    error
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Do something with response data
    response,
  (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = (err && err.response && err.response?.status) || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return err.response;
      }

      // forbidden (permission related issues)
      case 403: {
        // toast.error("You don't permisson access this resource....");
        return err.response;
      }

      // generic api error (server related) unexpected
      default: {
        // toast.error("................ERROR");
        return err.response;
      }
    }
    // Do something with response error
    // return Promise.reject(error);
  }
);

export default axiosInstance;
