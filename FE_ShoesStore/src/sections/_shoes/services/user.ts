import { user, userPassword } from 'src/types/user';
import axiosInstance from 'src/utils/axios/axios';
import { toast } from 'react-toastify';
import React from 'react';

export const CreateUser = async (dataUser: user) => {
  try {
    const res = await axiosInstance.post('/auth/register', dataUser);
    if (res.status === 200 || res.status === 201) {
      toast.success('Đăng kí thành công');
      return res;
    }
    toast.error(res.data.message);
    return null;
  } catch (error) {
    error.log(error);
    return null;
  }
};
export const LoginUser = async (dataUser: user) => {
  try {
    const res = await axiosInstance.post('/auth/login', dataUser);

    if (res.status === 200 || res.status === 201) {
      toast.success('Đăng nhập thành công');
      return res;
    }
    return null;
  } catch (error) {
    // console.error(error);
    return null;
  }
};
export const LoginUserByGoogle = async (credentialResponse: any) => {
  try {
    const res = await axiosInstance.post('/auth/google/login', credentialResponse);
    if (res.status === 200 || res.status === 201) {
      toast.success('Đăng nhập thành công');
      return res;
    }
    toast.error('Có lẽ lỗi từ server, vui lòng đăng nhập lại sau.');
    return null;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export const GetUserProfile = async () => {
  try {
    const res = await axiosInstance.get('/user/detail');

    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updateUserProfile = async (dataUser: user) => {
  try {
    const res = await axiosInstance.patch(`/user/update`, dataUser);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updatePasswordAccount = async (passData: userPassword) => {
  try {
    const res = await axiosInstance.patch(`/user/changepassword`, passData);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadAvatar = async (
  FormData: any,
  handleProgress: React.Dispatch<React.SetStateAction<number>>,
  handleShowProgress: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    handleShowProgress(true);
    const res = await axiosInstance.post('/user/avatar/upload', FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (processEvent) => {
        const p = (processEvent.loaded * 100) / (processEvent.total || 1);
        handleProgress(p);
      },
    });
    if (res) {
      setTimeout(() => {
        handleShowProgress(false);
        handleProgress(0);
      }, 2000);
      toast.success('Cập nhật thành công!!!');

      return res.data;
    }
    setTimeout(() => {
      handleShowProgress(false);
      handleProgress(0);
    }, 2000);
    toast.success('Cập nhật thất bại!!!');
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
