// @mui
import { Button, Stack } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { toast } from 'react-toastify';
// components
import Iconify from 'src/components/iconify';
import { useDispatch } from 'src/redux/store';
import { getUserDetail } from 'src/redux/Slices/user';
import { useNavigate } from 'react-router';
import { paths } from 'src/routes/paths';
import { LoginUserByGoogle } from '../../services/user';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const clientId = '1096214248116-502or3v517qlathq7n830k1msgn2nok1.apps.googleusercontent.com';

  // Redux
  const dispatch = useDispatch();
  // Navigate
  const navigate = useNavigate();
  // Login Google
  const handleLoginGoogle = async (credentialResponse: any) => {
    try {
      const res = await LoginUserByGoogle(credentialResponse);
      if (res) {
        const token = res.data.accessToken;
        localStorage.setItem('jwt', token);
        setTimeout(() => {
          dispatch(getUserDetail);
          navigate(paths.shoes.home);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      {/* <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button> */}
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => handleLoginGoogle(credentialResponse)}
          onError={() => {
            toast.error('Đăng nhập thất bại !!!!');
          }}
          useOneTap
        />
      </GoogleOAuthProvider>

      {/* <Button
        onClick={() => googleLogout()}
        fullWidth
        size="large"
        color="inherit"
        variant="outlined"
      >
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>
      <Button color="inherit" fullWidth variant="outlined" size="large">
        <Iconify icon="carbon:logo-github" width={24} sx={{ color: 'text.primary' }} />
      </Button> */}
    </Stack>
  );
}
