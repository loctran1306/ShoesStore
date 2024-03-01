import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Input,
  Button,
  TextField,
  IconButton,
  Typography,
  LinearProgress,
  LinearProgressProps,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useActiveLink from 'src/hooks/useActiveLink';
// config
import { NAV } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useDispatch, useSelector } from 'src/redux/store';
import { getUserDetail, resetUser } from 'src/redux/Slices/user';
// eslint-disable-next-line import/no-cycle
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box, fontSize, width } from '@mui/system';
import { BASE_URL } from 'src/utils/axios/axios';
import AccountPersonalView from '../../view/AccountPersonalView';
import AccountVouchersView from '../../view/AccountVouchersView';
import AccountOrdersView from '../../view/AccountOrdersView';
import AccountPaymentView from '../../view/AccountPaymentView';
import { uploadAvatar } from '../../services/user';
import UploadFiles from '../../components/file/UploadFile';
import AccountManageShoes from '../../view/AccountManageShoes';
import { LinearProgressWithLabel } from '../../components/LinearProgressWithLabel';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Personal Info',
    icon: <Iconify icon="carbon:user" />,
    component: <AccountPersonalView />,
  },
  {
    title: 'Vouchers',
    icon: <Iconify icon="carbon:cut-out" />,
    component: <AccountVouchersView />,
  },
  {
    title: 'Orders',
    icon: <Iconify icon="carbon:document" />,
    component: <AccountOrdersView />,
  },
  {
    title: 'Payment',
    icon: <Iconify icon="carbon:purchase" />,
    component: <AccountPaymentView />,
  },
  {
    title: 'Manage Shoes',
    icon: <Iconify icon="ph:sneaker-move-bold" />,
    component: <AccountManageShoes />,
  },
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  setRenderComponent: Dispatch<SetStateAction<ReactNode>>;
  setLoadingComponent: Dispatch<SetStateAction<boolean>>;
};

export default function AccountMenu({
  open,
  onClose,
  setRenderComponent,
  setLoadingComponent,
}: Props) {
  const [active, setActive] = useState<string>(navigations[0].title);

  useEffect(() => {
    const activeItem = navigations.find((i) => i.title === active);
    if (activeItem) {
      setLoadingComponent(true);
      setTimeout(() => {
        setRenderComponent(activeItem?.component);
        setLoadingComponent(false);
      }, 300);
    }
  }, [active, setRenderComponent, setLoadingComponent]);

  const isMdUp = useResponsive('up', 'md');

  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.clear();
    dispatch(resetUser);
    navigate(paths.shoes.home);
  };

  // upload Avatar
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const [avatarProfile, setAvatarProfile] = useState<any>({
    avatar: userProfile?.isGoogle
      ? `${userProfile?.avatarUrl}`
      : `${BASE_URL}/${userProfile?.avatarUrl}`,
  });

  useEffect(() => {
    setAvatarProfile({
      avatar: userProfile?.isGoogle
        ? `${userProfile?.avatarUrl}`
        : `${BASE_URL}/${userProfile?.avatarUrl}`,
    });
  }, [userProfile]);

  const handleAttachFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarProfile({ avatar: reader.result, file });
    };
    reader.readAsDataURL(file);
  };

  const updateAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', avatarProfile.file);
    const res = await uploadAvatar(formData, setProgress, setShowProgress);
    if (res) {
      dispatch(getUserDetail);
    }
  };

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 2, pb: 3 }}>
        <Stack spacing={1} direction="row">
          <Box
            onClick={() =>
              window.open(
                userProfile?.isGoogle
                  ? `${userProfile?.avatarUrl}`
                  : `${BASE_URL}/${userProfile?.avatarUrl}`,
                '_blank'
              )
            }
          >
            <Avatar
              src={`${avatarProfile.avatar}` || _mock.image.avatar(0)}
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                cursor: 'pointer',
                '&:hover': { opacity: 0.72 },
              }}
              variant="rounded"
            />
          </Box>

          {!userProfile?.isGoogle && (
            <Box>
              <Stack>
                <Stack
                  onClick={() => inputFileRef.current?.click()}
                  direction="row"
                  alignItems="center"
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.72 } }}
                >
                  <IconButton>
                    <Iconify icon="carbon:edit" sx={{ width: 14, height: 14 }} />
                  </IconButton>
                  <Typography fontSize={12} fontWeight={500}>
                    Change photo
                  </Typography>
                </Stack>
                {avatarProfile.file && (
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      size="small"
                      onClick={() =>
                        setAvatarProfile({
                          avatar: userProfile?.isGoogle
                            ? `${userProfile?.avatarUrl}`
                            : `${BASE_URL}/${userProfile?.avatarUrl}`,
                        })
                      }
                    >
                      cancel
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: 'green', backgroundColor: '#99FF99' }}
                      onClick={updateAvatar}
                    >
                      Update
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          )}

          {/* UploadFile */}
          <UploadFiles multi={false} refFile={inputFileRef} handleInputFile={handleAttachFile} />
          {/* ------------------ */}
        </Stack>
        {showProgress && (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {`${userProfile?.firstName} ${userProfile?.lastName}` || userProfile?.email}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {userProfile?.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} active={active} setActive={setActive} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
          onClick={() => handleLogout()}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type MenuItemProps = {
  item: {
    title: string;
    icon: React.ReactNode;
  };
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
};

function MenuItem({ item, active, setActive }: MenuItemProps) {
  return (
    <Stack key={item.title} color={active === item.title ? 'red' : 'inherit'}>
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
        onClick={() => setActive(item.title)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active === item.title && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Stack>
  );
}
