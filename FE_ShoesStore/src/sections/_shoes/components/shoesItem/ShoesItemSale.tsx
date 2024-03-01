import { Link as RouterLink } from 'react-router-dom';
// @mui
import { LinearProgress, Link, Paper, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { IShoesItemProps } from 'src/types/shoes';
import ShoesPrice from '../ShoesPrice';
//

// ----------------------------------------------------------------------

type Props = {
  shoes: IShoesItemProps;
  shoesSale?: boolean;
  sx?: SxProps<Theme>;
};

export default function ShoesItemSale({ shoes, shoesSale = false, sx }: Props) {
  return (
    <Link component={RouterLink} to={{}} color="inherit" underline="none">
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          transition: (theme) =>
            theme.transitions.create('background-color', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': {
            bgcolor: 'background.neutral',
          },
          ...sx,
        }}
      >
        <Image
          src={shoes.image}
          sx={{
            mb: 2,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5}>
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {shoes.name}
          </TextMaxLine>

          <ShoesPrice
            price={shoes.price}
            sx={{
              ...(shoesSale && {
                color: 'error.main',
              }),
            }}
          />
        </Stack>

        {shoesSale && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(shoes.sold / shoes.inStock) * 100}
              sx={{ width: 1 }}
            />

            <Typography
              variant="caption"
              sx={{ flexShrink: 0, color: 'text.disabled' }}
            >{`🔥 ${shoes.sold} Sold`}</Typography>
          </Stack>
        )}
      </Paper>
    </Link>
  );
}
