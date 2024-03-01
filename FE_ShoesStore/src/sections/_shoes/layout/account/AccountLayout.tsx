import { useState } from 'react';
// @mui
import { Box, Button, Container, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
//
import { LoadingChildrenScreen } from 'src/components/loading-screen/LoadingChildrenScreen';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import ShoesHeader from '../shoes/ShoesHeader';
// eslint-disable-next-line import/no-cycle
import AccountPersonalView from '../../view/AccountPersonalView';
import AccountMenu from './AccountMenu';

// ----------------------------------------------------------------------

export default function AccountLayout() {
  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(<AccountPersonalView />);
  const [loadingComponent, setLoadingComponent] = useState(false);

  const isMdUp = useResponsive('up', 'md');

  const [menuOpen, setMemuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMemuOpen(true);
  };

  const handleMenuClose = () => {
    setMemuOpen(false);
  };

  return (
    <>
      <ShoesHeader headerOnDark={false} />

      {!isMdUp && (
        <Box sx={{ mt: 10, mb: 2, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
          <Container>
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon="carbon:menu" />}
              onClick={handleMenuOpen}
            >
              Account
            </Button>
          </Container>
        </Box>
      )}

      <Container>
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
            mt: {
              md: 16,
            },
          }}
        >
          <AccountMenu
            open={menuOpen}
            onClose={handleMenuClose}
            setRenderComponent={setRenderComponent}
            setLoadingComponent={setLoadingComponent}
          />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
            }}
          >
            {loadingComponent ? <LoadingChildrenScreen /> : renderComponent}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
