import { m } from 'framer-motion';
// @mui
import { Box, SxProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
// utils
//
import Logo from '../logo';
import ProgressBar from '../progress-bar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}));

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoadingScreen({ sx }: Props) {
  return (
    <>
      <ProgressBar />

      <StyledRoot sx={sx}>
        <m.div
          animate={{
            scale: [1, 0.9, 0.9, 1, 1],
            opacity: [1, 0.4, 0.8, 1, 1],
            rotate: [0, 20, 0, -45, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 0.2,
            repeat: Infinity,
          }}
        >
          <Logo
            single
            sx={{
              width: 128,
              height: 128,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </m.div>
        <Box
          component={m.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],

            opacity: [1, 0.4, 0.8, 1, 1],
            borderRadius: ['50%', '50%', '50%', '50%', '50%'],
          }}
          transition={{ ease: 'linear', duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            position: 'absolute',
            border: '3px solid #33CCFF',
          }}
        />

        {/* <Box
          component={m.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['50%', '50%', '50%', '50%', '50%'],
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            position: 'absolute',
            border: (theme) => `solid 8px ${alpha(theme.palette.primary.light, 0.24)}`,
          }}
        /> */}
      </StyledRoot>

      <Box sx={{ width: 1, height: '100vh' }} />
    </>
  );
}
