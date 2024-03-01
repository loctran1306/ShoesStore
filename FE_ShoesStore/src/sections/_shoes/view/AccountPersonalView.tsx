import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// assets
// components
import _ from 'lodash';
import { toast } from 'react-toastify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { getUserDetail } from 'src/redux/Slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
import { updateUserProfile } from 'src/sections/_shoes/services/user';
import { useState } from 'react';
import AccountFormChangePassword from '../layout/account/AccountFormChangePassword';
//

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];
// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(1, 'Mininum 1 characters')
      .max(15, 'Maximum 15 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(1, 'Mininum 1 characters')
      .max(15, 'Maximum 15 characters'),
  });
  const splitAdress = userProfile?.address?.split('-') || ['', '', '', ''];
  const defaultValues = {
    firstName: userProfile ? userProfile.firstName : '',
    lastName: userProfile ? userProfile.lastName : '',
    email: userProfile ? userProfile.email : '',
    phoneNumber: userProfile ? userProfile.phoneNumber : '',
    birthday: userProfile ? new Date(userProfile?.birthday || '') : null,
    gender: userProfile ? userProfile.gender : '',
    streetAddress: userProfile ? splitAdress[0] : '',
    district: userProfile ? splitAdress[1] : '',
    city: userProfile ? splitAdress[2] : '',
    country: 'Việt Nam',
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
    if (_.isEqual(data, defaultValues)) {
      toast.warning('Không có thay đổi nào để cập nhật...');
    } else {
      const {
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        birthday,
        streetAddress,
        city,
        district,
        country,
      } = data;
      const address = streetAddress
        ?.concat('-', district || '')
        .concat('-', city || '')
        .concat('-', country || '');
      const formatData = {
        firstName,
        lastName,
        email,
        gender: gender || GENDER_OPTIONS[0].value,
        birthday: birthday?.toString(),
        address,
        phoneNumber,
      };
      try {
        const res = await updateUserProfile(formatData);
        if (res) {
          dispatch(getUserDetail);
          toast.success('Cập nhật thành công!!!');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onCancelChange = () => {
    reset();
  };

  // Show Change Password
  const [showFormChangePassword, setShowFormChangePassword] = useState<boolean>(false);

  return (
    <>
      {!userProfile?.isGoogle && (
        <Stack>
          <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontSize={20} fontWeight={700}>
              Personal
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography fontSize={14} fontWeight={600}>
                Change Password
              </Typography>
              <IconButton onClick={() => setShowFormChangePassword(!showFormChangePassword)}>
                <Iconify
                  color={`${showFormChangePassword ? 'red' : 'green'}`}
                  icon={`${showFormChangePassword ? 'mdi:cancel-bold' : 'carbon:edit'}`}
                  sx={{ width: 16, height: 16, cursor: 'pointer' }}
                />
              </IconButton>
            </Stack>
          </Stack>
          {showFormChangePassword && <AccountFormChangePassword />}
        </Stack>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <RHFTextField name="firstName" label="First Name" />

          <RHFTextField name="lastName" label="Last Name" />

          <RHFTextField disabled name="email" label="Email Address" />

          <RHFTextField type="number" name="phoneNumber" label="Phone Number" />

          <Controller
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                format="dd/MM/yyyy"
                label="Birthday"
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message,
                  },
                }}
                {...field}
                value={field?.value || null}
              />
            )}
          />

          <RHFSelect native name="gender" label="Gender">
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </RHFSelect>

          <RHFTextField name="streetAddress" label="Street Address" />

          {/* <RHFTextField name="zipCode" label="Zip Code" /> */}

          <RHFTextField name="district" label="District" />
          <RHFTextField name="city" label="City" />
          <RHFTextField disabled name="country" label="Country" />

          {/* <RHFSelect native name="country" label="Country">
          <option value="VN" />
          {countries.map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </RHFSelect> */}
        </Box>

        <Stack direction="row" spacing={2} mt={2} justifyContent="end">
          <LoadingButton onClick={onCancelChange} color="error" size="medium" variant="contained">
            Cancel
          </LoadingButton>
          <LoadingButton
            color="success"
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
