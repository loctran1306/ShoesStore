// @mui
import { Box, Container, Unstable_Grid2 as Grid, Typography } from '@mui/material';
// _mock
//
import ShoesItemCountDown from '../../components/shoesItem/ShoesItemCountDown';
import ShoesItemSale from '../../components/shoesItem/ShoesItemSale';

// ----------------------------------------------------------------------

const _shoesFeature = [
  {
    id: 1,
    name: 'Air Jordan 1 Low SE',
    description:
      'New colours and fresh textures give you an updated AJ1 without losing that forever great look and familiar feel. This all-time favourite is made from premium materials and decked out with subtle accents (check that elephant-print Swoosh and gold Jumpman) to give you a staple sneaker with modern expression.',
    image: '/assets/images/shoes/shoes_1.png',
    category: 'Men',
    sold: 2 + 40,
    inStock: 100,
    label: 'sale',
    price: 100,
    priceSale: 50,
    images: ['/assets/images/shoes/shoes_1.png', '/assets/images/shoes/shoes_1.png'],
  },
  {
    id: 2,
    name: 'Jordan Super Play',
    description:
      "Your feet deserve nothing but the best. These slides offer lightweight foam and plush underfoot cushioning—premium comfort you'll look forward to after your next big game.",
    image: '/assets/images/shoes/shoes_2.png',
    category: 'Men',
    sold: 2 + 40,
    inStock: 100,
    label: 'sale',
    price: 100,
    priceSale: 50,
    images: ['/assets/images/shoes/shoes_1.png', '/assets/images/shoes/shoes_1.png'],
  },
  {
    id: 3,
    name: 'Nike Invincible 3',
    description:
      "With maximum cushioning to support every mile, the Invincible 3 is our highest level of comfort underfoot. Its plush and bouncy ZoomX foam helps you stay stable and fresh. In other words—it's going to feel good all day, whatever you're doing. And when you pair all this cushioning with easy-to-style colours, you get a shoe you never want to stop wearing.",
    image: '/assets/images/shoes/shoes_3.png',
    category: 'Men',
    sold: 2 + 40,
    inStock: 100,
    label: 'sale',
    price: 100,
    priceSale: 50,
    images: ['/assets/images/shoes/shoes_1.png', '/assets/images/shoes/shoes_1.png'],
  },
];
export default function ShoesFeature() {
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
        Comming soon...
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {_shoesFeature.slice(0, 2).map((shoes, index) => (
              <ShoesItemCountDown
                key={shoes.id}
                shoes={shoes}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>

        <Grid xs={12} lg={4}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
          >
            {_shoesFeature.slice(2, 8).map((shoes) => (
              <ShoesItemSale key={shoes.id} shoes={shoes} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
