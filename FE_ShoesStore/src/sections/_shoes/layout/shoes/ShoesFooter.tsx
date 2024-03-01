import { Container, Typography } from '@mui/material';
import Logo from 'src/components/logo/Logo';

const ShoesFooter = () => (
  <Container sx={{ py: 8, textAlign: 'center' }}>
    <Logo single />

    <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
      © 2023. All rights reserved
    </Typography>
  </Container>
);

export default ShoesFooter;
