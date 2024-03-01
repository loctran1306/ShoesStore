import { toast } from 'react-toastify';
import { IShoesImage, IShoesProduct } from 'src/types/shoes';
import axiosInstance from 'src/utils/axios/axios';

export const uploadShoesImages = async (
  FormData: any,
  handleProgress: React.Dispatch<React.SetStateAction<number>>,
  handleShowProgress: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    handleShowProgress(true);
    const res = await axiosInstance.post('/product/image/uploads', FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (processEvent) => {
        const p = (processEvent.loaded * 100) / (processEvent.total || 1);
        handleProgress(p);
      },
    });
    setTimeout(() => {
      handleShowProgress(false);
      handleProgress(0);
    }, 2000);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    toast.error(res.data.message);
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface typeDataShoes {
  data: IShoesProduct;
  category: number[];
  files: IShoesImage[];
}

// Create new shoes
export const createShoes = async (dataShoes: typeDataShoes) => {
  try {
    const res = await axiosInstance.post('/product/create', {
      dataShoes,
    });
    if (res) {
      toast.success('Create New Shoes Success');
      return res.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get all shoes Add Today

export const getAllShoesAddTodayService = async () => {
  try {
    const res = await axiosInstance.get('/product/all/today');
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
