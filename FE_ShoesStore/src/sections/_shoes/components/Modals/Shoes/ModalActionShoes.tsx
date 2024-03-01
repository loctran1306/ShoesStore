import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import useResponsive from 'src/hooks/useResponsive';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllCategory } from 'src/sections/_shoes/services/category';
import { createShoes, uploadShoesImages } from 'src/sections/_shoes/services/product';
import * as Yup from 'yup';
import LoadingScreen from 'src/components/loading-screen';
import { LinearProgressWithLabel } from '../../LinearProgressWithLabel';
import UploadFiles from '../../file/UploadFile';

type props = {
  openModal: boolean;
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
};

interface category {
  id: number;
  name: string;
}

const SIZE_OPTIONS = [35, 36, 36.5, 37, 38, 39, 40, 40.5, 41, 41.5, 42, 43, 44];

const COLORS = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0066FF',
  '#FF6600',
  '#FFFF00',
  '#FF6699',
  '#00FFFF',
  '#FFFFCC',
];

function ModalActionShoes({ openModal, handleCloseModal }: props) {
  // View Screen
  const isMdUp = useResponsive('up', 'md');
  const isLgUp = useResponsive('up', 'lg');

  const configSize = () => {
    if (isMdUp) {
      if (isLgUp) {
        return -8;
      }
      return -24;
    }
    return 0;
  };

  // loading
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);

  // State
  const [categories, setCategories] = useState<[category]>();
  // API
  const getCategory = async () => {
    const res = await getAllCategory();
    if (res) {
      setCategories(res);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checked Type
  const [checkedList, setCheckedList] = useState<{ id: number; checked: boolean }[]>([]);
  const handleOnChangeChecked = (e: React.ChangeEvent<HTMLInputElement>, cg: category) => {
    if (e.target.checked) {
      const newArr = [...checkedList, { id: cg.id, checked: e.target.checked }];
      setCheckedList(newArr);
    } else {
      const exist = checkedList.find((i) => i.id === cg.id);

      if (exist) {
        const newArr = checkedList.filter((i) => i.id !== exist.id);
        setCheckedList(newArr);
      }
    }
  };

  // Check Size
  const [selectedSize, setSelectedSize] = useState<number[]>([]);

  const handleSelectSize = (size: number) => {
    const isSelected = selectedSize.includes(size);
    if (isSelected) {
      setSelectedSize(selectedSize.filter((s) => s !== size));
    } else {
      setSelectedSize([...selectedSize, size]);
    }
  };

  // Color
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const handleSelectColor = (color: string) => {
    const isSelected = selectedColors.includes(color);
    if (isSelected) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  // upload images shoes
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [shoesImages, setShoesImage] = useState<any[]>([]);
  const handleAttachFiles = (e: any) => {
    const { files } = e.target;
    const tempImage: any[] = [];
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const temp = { image: reader.result, file };
        tempImage.push(temp);
        if (tempImage.length === Object.keys(files).length) {
          setShoesImage([...shoesImages].concat(tempImage));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (image: any) => {
    const item = shoesImages.filter((i) => !_.isEqual(i, image));
    setShoesImage(item);
  };

  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const handleUploadImages = async () => {
    const formData = new FormData();
    shoesImages.forEach((i) => formData.append('files', i.file));

    const res = await uploadShoesImages(formData, setProgress, setShowProgress);
    return res;
  };

  useEffect(() => {
    console.log('shoesImage', shoesImages);
    console.log('checkedList', checkedList);
  }, [shoesImages, checkedList]);

  // Form Provider
  const AccountPersonalSchema = Yup.object().shape({
    name: Yup.string().required('Shoes name is required').min(1, 'Mininum 1 characters'),
    price: Yup.string().required('Price is required').min(1, 'Mininum 1 characters'),
    quantity: Yup.string().required('Quantity is required').min(1, 'Mininum 1 characters'),
  });

  const defaultValues = {
    name: '',
    price: '',
    description: '',
    quantity: '',
    // categoris: ,
  };

  const methods = useForm<typeof defaultValues>({
    resolver: yupResolver(AccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    let files = [];
    if (shoesImages.length > 0) {
      const res = await handleUploadImages();
      if (res) {
        files = res;
      }
    }
    try {
      const { name, description, price, quantity } = data;
      const newData = {
        name,
        description,
        price: parseInt(price, 10),
        quantity: parseInt(quantity, 10),
        size: selectedSize.join(','),
        color: selectedColors.join(','),
      };
      const res = await createShoes({
        data: newData,
        category: checkedList.map((cg) => cg.id),
        files,
      });
      if (res) {
        setTimeout(() => {
          handleCloseModal(!openModal);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={openModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          bottom: '15%',
          left: '15%',
          width: '70vw',
          bgcolor: 'background.paper',
          //   boxShadow: 24,
          p: 4,
          height: '50%vh',
        }}
      >
        {loading ? (
          <LoadingScreen sx={{ width: '70%' }} />
        ) : (
          <>
            <IconButton
              sx={{ position: 'absolute', top: 2, right: 2 }}
              onClick={() => handleCloseModal(!openModal)}
            >
              <Iconify
                color="red"
                icon="zondicons:close-outline"
                sx={{ width: 24, height: 24, cursor: 'pointer' }}
              />
            </IconButton>
            <Typography
              sx={{
                mb: 3,
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              New Shoes
            </Typography>

            <Box height="90%">
              <Scrollbar>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={7} sm={8}>
                      <RHFTextField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={5} sm={4}>
                      <RHFTextField
                        InputProps={{
                          endAdornment: (
                            <Typography width={120} fontWeight={700} fontSize={14}>
                              .000 VND
                            </Typography>
                          ),
                        }}
                        type="number"
                        name="price"
                        label="Price"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RHFTextField multiline name="description" label="Description" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFTextField type="number" name="quantity" label="Quantity" />
                    </Grid>

                    {/* Category */}
                    <Grid item xs={12} md={6}>
                      <FormGroup sx={{ marginLeft: 2 }}>
                        <Grid container>
                          {categories &&
                            categories.map((cg) => (
                              <Grid key={cg.id} item xs={4} sm={3} md={6} lg={3}>
                                <FormControlLabel
                                  label={cg.name}
                                  control={
                                    <Checkbox
                                      value={cg.id}
                                      checked={!!checkedList.find((i) => i.id === cg.id)}
                                      onChange={(e) => handleOnChangeChecked(e, cg)}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </FormGroup>
                    </Grid>

                    {/* Size */}
                    <Grid item xs={12} md={6} sx={{ marginTop: configSize }}>
                      <FormGroup sx={{ marginLeft: 2 }}>
                        <Grid container>
                          {SIZE_OPTIONS.map((size, index) => (
                            <Grid key={index} item xs={4} sm={3} md={4} lg={2}>
                              <FormControlLabel
                                label={size}
                                control={
                                  <Checkbox
                                    value={index}
                                    checked={selectedSize.includes(size)}
                                    onChange={() => handleSelectSize(size)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </Grid>

                    {/* color */}
                    <Grid item xs={12}>
                      <Stack direction="row" flexWrap="wrap">
                        {COLORS.map((color, index) => (
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              '&:hover': {
                                opacity: 0.72,
                              },
                              p: 1,
                              m: 2,
                            }}
                            key={index}
                            onClick={() => handleSelectColor(color)}
                          >
                            <div
                              style={{
                                // border: '1px solid #000000',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow:
                                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                              }}
                            >
                              {selectedColors.includes(color) && (
                                <IconButton sx={{ color: color === '#000000' ? 'white' : 'black' }}>
                                  ✔
                                </IconButton>
                              )}
                            </div>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>

                  <Stack my={2} direction="row" alignItems="center" sx={{ cursor: 'pointer' }}>
                    <Typography fontSize={20} fontWeight={600}>
                      Image
                    </Typography>
                    <IconButton onClick={() => inputFileRef.current?.click()}>
                      <Iconify
                        icon="basil:add-solid"
                        sx={{ width: 24, height: 24, '&:hover': { opacity: 0.72 } }}
                      />
                    </IconButton>
                    {/* UploadFile */}
                    <UploadFiles multi refFile={inputFileRef} handleInputFile={handleAttachFiles} />
                    {/* ------------------ */}
                  </Stack>
                  <Grid container spacing={2}>
                    {shoesImages.map((i, index) => (
                      <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                        <Box
                          mb={2}
                          key={index}
                          width={130}
                          height={130}
                          bgcolor="#EEEEEE"
                          p={1}
                          //   overflow="hidden"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="8%"
                          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                          position="relative"
                        >
                          <IconButton
                            key={index}
                            sx={{ position: 'absolute', top: -16, right: -16, display: 'block' }}
                            onClick={() => handleDeleteImage(i)}
                          >
                            <Iconify
                              icon="icon-park-solid:close-one"
                              sx={{
                                width: 24,
                                height: 24,
                                cursor: 'pointer',
                                '&:hover': {
                                  color: '	#FF3300',
                                },
                              }}
                            />
                          </IconButton>

                          <img
                            src={i.image}
                            alt={i.file.name}
                            style={{
                              maxWidth: '100%',
                              height: '100%',
                              display: 'block',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                        {showProgress && (
                          <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                          </Box>
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Box display="flex" justifyContent="end">
                    <LoadingButton
                      color="success"
                      size="medium"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      sx={{ my: 2 }}
                    >
                      Add
                    </LoadingButton>
                  </Box>
                </FormProvider>
              </Scrollbar>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ModalActionShoes;
