import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Unstable_Grid2 as Grid } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// utils
import { filterStyles } from 'src/utils/cssStyles';
// routes
// types
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';
import { IShoesItemSlide } from 'src/types/shoes';

// ----------------------------------------------------------------------

type Props = {
  shoes: IShoesItemSlide;
};

export default function ShoesItemSlide({ shoes }: Props) {
  const theme = useTheme();

  const { label, name, description, image } = shoes;

  return (
    <Grid
      container
      rowSpacing={{
        xs: 5,
        md: 0,
      }}
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid xs={12} md={6}>
        <Box
          sx={{
            maxWidth: { md: 440 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            {label}
          </Label>

          <TextMaxLine variant="h3" sx={{ mb: 2 }}>
            {name}
          </TextMaxLine>

          <TextMaxLine variant="body2" sx={{ mb: 5, color: 'text.secondary' }}>
            {description}
          </TextMaxLine>

          <Button
            component={RouterLink}
            to={{}}
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Shop Now
          </Button>
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Image
          src={image}
          sx={{
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
            maxWidth: 400,
            ml: 'auto',
            mr: { xs: 'auto', md: 'unset' },
          }}
        />
      </Grid>
    </Grid>
  );
}
