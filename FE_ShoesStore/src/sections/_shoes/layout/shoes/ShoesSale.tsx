import { add } from 'date-fns';
import { useRef } from 'react';
// @mui
import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// _mock
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import CountDownBlock from '../../components/CountDownBlock';
import ShoesItemSale from '../../components/shoesItem/ShoesItemSale';
//

// ----------------------------------------------------------------------

const _shoesSale = [
  {
    id: 1,
    name: 'AHIHA',
    description: 'AHIAHI',
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
    name: 'AHIHA',
    description: 'AHIAHI',
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
    name: 'AHIHA',
    description: 'AHIAHI',
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

export default function ShoesSale() {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: _shoesSale.length > 6 ? 6 : _shoesSale.length,
    slidesToScroll: _shoesSale.length > 6 ? 6 : _shoesSale.length,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
        ...(isMdUp && { display: 'none' }),
      },
    }),
    responsive: [
      {
        // Down md
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        // Down sm
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          🔥 Hot Deal Today
        </Typography>

        <CountDownBlock
          hiddenLabel
          expired={add(new Date(), { hours: 1, minutes: 30 })}
          sx={{
            '& .value': {
              width: 36,
              height: 32,
              color: 'grey.800',
              bgcolor: 'text.primary',
              ...(theme.palette.mode === 'light' && {
                color: 'common.white',
              }),
            },
            '& .separator': { color: 'text.primary' },
          }}
        />

        {isMdUp && (
          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            flexGrow={1}
            spacing={2}
            justifyContent="flex-end"
          />
        )}
      </Stack>

      <Carousel ref={carouselRef} {...carouselSettings}>
        {_shoesSale.map((shoes) => (
          <Box
            key={shoes.id}
            sx={{
              py: 0.5,
              px: { xs: 1, md: 1.5 },
            }}
          >
            <ShoesItemSale shoes={shoes} shoesSale />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
