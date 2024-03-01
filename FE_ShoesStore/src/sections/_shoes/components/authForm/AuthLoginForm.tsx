import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

import { LoginUser } from 'src/sections/_shoes/services/user';
import { useDispatch } from 'src/redux/store';
import { getUserDetail } from 'src/redux/Slices/user';
import { updateHeaderToken } from 'src/utils/axios/axios';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
};

export default function AuthLoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // reset setError
  const resetSetError = () => {
    clearErrors('email');
    clearErrors('password');
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const res = await LoginUser(data);
      if (res) {
        const token = res.data.accessToken;
        const refreshtoken = res.data.refreshToken;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshtoken', refreshtoken);
        updateHeaderToken(token);
        setTimeout(() => {
          dispatch(getUserDetail);
          navigate(paths.shoes.home);
          reset();
        }, 1000);
      } else {
        setError('email', {
          message: 'Tên đăng nhập hoặc mật khẩu không đúng',
        });
        setError('password', {
          type: 'manual',
          message: 'Tên đăng nhập hoặc mật khẩu không đúng',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField onClick={() => resetSetError()} name="email" label="Email address" />

        <RHFTextField
          onClick={() => resetSetError()}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          component={RouterLink}
          to={paths.resetPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Forgot password?
        </Link>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
