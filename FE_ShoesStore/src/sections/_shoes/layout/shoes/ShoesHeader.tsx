// @mui
import { AppBar, Avatar, Badge, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// routes
import { paths } from 'src/routes/paths';
// config
import { HEADER } from 'src/config-global';
// components
import Logo from 'src/components/logo';
import SettingsDrawer from 'src/components/settings/drawer';
//
import { Link as RouterLink } from 'react-router-dom';
import _mock from 'src/_mock';
import Iconify from 'src/components/iconify';
import HeaderShadow from 'src/layouts/components/HeaderShadow';
import Searchbar from 'src/layouts/components/Searchbar';
import { NavDesktop, NavMobile, navConfig } from 'src/layouts/main/nav';
import { useSelector } from 'src/redux/store';
import { BASE_URL } from 'src/utils/axios/axios';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function ShoesHeader({ headerOnDark }: Props) {
  const { userProfile } = useSelector((state) => state.user);

  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const isOffset = useOffSetTop();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          {!isMdUp && <NavMobile data={navConfig} />}

          {isMdUp && (
            <>
              <Box sx={{ lineHeight: 0, position: 'relative' }}>
                <Logo />
              </Box>
              <NavDesktop data={navConfig} />
            </>
          )}

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />

              <SettingsDrawer />
            </Stack>
            <Stack spacing={2.5} direction="row" alignItems="center">
              <Badge badgeContent={4} color="error">
                <IconButton
                  component={RouterLink}
                  to={paths.eCommerce.cart}
                  size="small"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Iconify icon="carbon:shopping-cart" width={24} />
                </IconButton>
              </Badge>

              {userProfile ? (
                <Box component={RouterLink} to={paths.shoes.acount}>
                  <Avatar
                    src={
                      userProfile.isGoogle
                        ? `${userProfile.avatarUrl}`
                        : `${BASE_URL}/${userProfile?.avatarUrl}` || _mock.image.avatar(0)
                    }
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    variant="rounded"
                  />
                </Box>
              ) : (
                <IconButton
                  component={RouterLink}
                  to={paths.login}
                  size="small"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Iconify icon="carbon:user" width={24} />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
