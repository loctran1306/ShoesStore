import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Paper, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { IShoesItemProps } from 'src/types/shoes';
import ShoesPrice from '../ShoesPrice';

// ----------------------------------------------------------------------

type Props = {
  shoes: IShoesItemProps;
  sx?: SxProps<Theme>;
  variant?: 'small' | 'large';
};

export default function ShoesItemTopSell({ shoes, variant = 'small', sx }: Props) {
  const isMdUp = useResponsive('up', 'md');

  const isLarge = isMdUp && variant === 'large';

  const coverImg = <Image src={shoes.image} />;

  const nameText = (
    <TextMaxLine variant="h5" line={1}>
      {shoes.name}
    </TextMaxLine>
  );

  const priceText = (
    <ShoesPrice price={shoes.price} sx={{ typography: 'h5', color: 'text.disabled' }} />
  );

  const moreBtn = (
    <Button
      component={RouterLink}
      to={{}}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
      sx={{ flexShrink: 0 }}
    >
      More Details
    </Button>
  );

  const renderLargeItem = (
    <Stack spacing={5}>
      {coverImg}

      <Stack spacing={5} direction="row" alignItems="center">
        <Stack spacing={1} flexGrow={1}>
          {nameText}
          {priceText}
        </Stack>

        {moreBtn}
      </Stack>
      <Typography
        variant="caption"
        sx={{
          flexShrink: 0,
          color: 'text.disabled',
          fontSize: 20,
          mt: '4px !important',
          ml: '-4px !important',
        }}
      >{`🔥 ${shoes.sold} Sold`}</Typography>
    </Stack>
  );

  const renderSmallItem = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
      sx={{ height: 1 }}
    >
      <Box
        sx={{
          order: { sm: 2 },
        }}
      >
        {coverImg}
      </Box>

      <Stack spacing={1}>
        {nameText}
        {priceText}
        <Typography
          variant="caption"
          sx={{
            flexShrink: 0,
            color: 'text.disabled',
            fontSize: 20,
            ml: '-4px !important',
          }}
        >{`🔥 ${shoes.sold} Sold`}</Typography>
        <Stack
          flexGrow={1}
          alignItems={{ xs: 'flex-end', sm: 'flex-start' }}
          justifyContent="flex-end"
          sx={{ pt: 5 }}
        >
          {moreBtn}
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <Paper
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
    >
      {isLarge ? renderLargeItem : renderSmallItem}
    </Paper>
  );
}
