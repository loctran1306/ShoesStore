import { useRef } from 'react';

// @mui
import { Box, Container } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// _mock
// components
import Carousel, { CarouselDots } from 'src/components/carousel';
import ShoesItemSlide from '../../components/shoesItem/ShoesItemSlide';
//

// ----------------------------------------------------------------------

const _shoesCarousel = [
  {
    id: 1,
    name: 'Air Jordan 1 Low SE',
    description:
      'New colours and fresh textures give you an updated AJ1 without losing that forever great look and familiar feel. This all-time favourite is made from premium materials and decked out with subtle accents (check that elephant-print Swoosh and gold Jumpman) to give you a staple sneaker with modern expression.',
    image: '/assets/images/shoes/shoes_1.png',
    label: 'Opening Sale Discount 50%',
  },
  {
    id: 2,
    name: 'Jordan Super Play',
    description:
      "Your feet deserve nothing but the best. These slides offer lightweight foam and plush underfoot cushioning—premium comfort you'll look forward to after your next big game.",
    image: '/assets/images/shoes/shoes_2.png',
    label: 'Opening Sale Discount 50%',
  },
  {
    id: 3,
    name: 'Nike Invincible 3',
    description:
      "With maximum cushioning to support every mile, the Invincible 3 is our highest level of comfort underfoot. Its plush and bouncy ZoomX foam helps you stay stable and fresh. In other words—it's going to feel good all day, whatever you're doing. And when you pair all this cushioning with easy-to-style colours, you get a shoe you never want to stop wearing.",
    image: '/assets/images/shoes/shoes_3.png',
    label: 'Opening Sale Discount 50%',
  },
];

export default function ShoesSlide() {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    fade: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 40,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  };

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {_shoesCarousel.map((shoes) => (
            <ShoesItemSlide key={shoes.id} shoes={shoes} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}
