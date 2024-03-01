import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import * as Yup from 'yup';
import { m } from 'framer-motion';
import getVariant from 'src/sections/examples/animate/getVariant';
import { updatePasswordAccount } from '../../services/user';

function AccountFormChangePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const AccountPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password should be of minimum 6 characters length')
      .notOneOf([Yup.ref('oldPassword')], 'New Password must other with Old Password'),
    confirmNewPassword: Yup.string()
      .required('Confirm NewPassword is required')
      .oneOf([Yup.ref('newPassword')], "New Password's not match"),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<typeof defaultValues>({
    resolver: yupResolver(AccountPasswordSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    clearErrors,
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    const formatData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      const res = await updatePasswordAccount(formatData);
      if (res) {
        reset();
        toast.success('Cập nhật mật khẩu thành công.');
      } else {
        setError('oldPassword', {
          message: 'Mật khẩu hiện tại không đúng',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box component={m.div} {...getVariant('fadeInDown')}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <RHFTextField
            onClick={() => clearErrors('oldPassword')}
            name="oldPassword"
            label="Old Password"
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

          <RHFTextField
            name="newPassword"
            label="New Password"
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

          <RHFTextField
            name="confirmNewPassword"
            label="Confirm New Password"
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
        </Stack>
        <Box display="flex" justifyContent="end" my={2}>
          <LoadingButton
            color="success"
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default AccountFormChangePassword;
