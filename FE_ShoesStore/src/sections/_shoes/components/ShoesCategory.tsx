// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Container, Stack } from '@mui/material';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const CATEGORIES = [
  { label: 'Man', icon: '/assets/icons/shoes/Man.svg', path: '#' },
  { label: 'Women', icon: '/assets/icons/shoes/Women.svg', path: '#' },
  { label: 'Sandal', icon: '/assets/icons/shoes/Sandal.svg', path: '#' },
  { label: 'Nike', icon: '/assets/icons/shoes/Nike.svg', path: '#' },
  { label: 'Adidas', icon: '/assets/icons/shoes/Adidas.svg', path: '#' },
  { label: 'Puma', icon: '/assets/icons/shoes/Puma.svg', path: '#' },
  { label: 'Converse', icon: '/assets/icons/shoes/Converse.svg', path: '#' },
  { label: 'Other', icon: '/assets/icons/shoes/Other.svg', path: '#' },
  { label: 'Old', icon: '/assets/icons/shoes/Old.svg', path: '#' },
  { label: 'New', icon: '/assets/icons/shoes/New.svg', path: '#' },
  { label: 'Sale', icon: '/assets/icons/shoes/Sale.svg', path: '#' },
  { label: 'Feature', icon: '/assets/icons/shoes/Feature.svg', path: '#' },
];

// ----------------------------------------------------------------------

export default function ShoesCategory() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Categories
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
      >
        {CATEGORIES.map((category) => (
          <Stack
            key={category.label}
            alignItems="center"
            justifyContent="center"
            sx={{
              px: 1,
              py: 3,
              borderRadius: 2,
              cursor: 'pointer',
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
              '&:hover': {
                boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
              },
            }}
          >
            <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.neutral', borderRadius: '50%' }}>
              <Image src={category.icon} sx={{ width: 40, height: 40 }} />
            </Box>

            <TextMaxLine variant="subtitle2" line={1}>
              {category.label}
            </TextMaxLine>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
