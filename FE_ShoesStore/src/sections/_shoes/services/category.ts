import axiosInstance, { updateHeaderToken } from 'src/utils/axios/axios';

export const getAllCategory = async () => {
  try {
    const res = await axiosInstance.get('/category/all');
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    if (res.status === 401 && res.statusText === 'Unauthorized') {
      const response = await axiosInstance.post('auth/refresh-token');
      localStorage.setItem('accessToken', response.data.accessToken);
      updateHeaderToken(response.data.accessToken);
      const reRes = await axiosInstance.get('/category/all');
      if (reRes.status === 200 || reRes.status === 201) {
        return reRes.data;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
