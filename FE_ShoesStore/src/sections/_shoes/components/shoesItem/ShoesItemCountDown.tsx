import { add } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Theme, alpha, useTheme } from '@mui/material/styles';
import { Typography, Stack, SxProps, Link } from '@mui/material';
// utils
import { filterStyles } from 'src/utils/cssStyles';
import { fCurrency } from 'src/utils/formatNumber';
// routes
import { paths } from 'src/routes/paths';
// theme
import { ColorSchema } from 'src/theme/palette';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { IShoesItemProps } from 'src/types/shoes';
import CountDownBlock from '../CountDownBlock';

// ----------------------------------------------------------------------

type Props = {
  shoes: IShoesItemProps;
  color?: ColorSchema;
  sx?: SxProps<Theme>;
};

export default function ShoesItemCountDown({ shoes, color = 'primary', sx }: Props) {
  const theme = useTheme();

  return (
    <Link component={RouterLink} to={{}} color="inherit" underline="none">
      <Stack
        spacing={3}
        sx={{
          p: 3,
          borderRadius: 2,
          color: `${color}.darker`,
          bgcolor: `${color}.lighter`,
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            color: `${color}.lighter`,
            bgcolor: `${color}.main`,
          },
          ...sx,
        }}
      >
        <Image
          src={shoes.image}
          sx={{
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
          }}
        />

        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <TextMaxLine variant="subtitle2" sx={{ opacity: 0.72 }}>
            {shoes.name}
          </TextMaxLine>

          <Typography variant="h5">{`From ${fCurrency(shoes.price)}`}</Typography>
        </Stack>

        <CountDownBlock expired={add(new Date(), { days: 1, hours: 8 })} />
      </Stack>
    </Link>
  );
}