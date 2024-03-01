import { Helmet } from 'react-helmet-async';
import { ShoesHomeView } from 'src/sections/_shoes/view';

const ShoesHomePage = () => (
  <>
    <Helmet>
      <title>Shoes Store</title>
    </Helmet>
    <ShoesHomeView />
  </>
);

export default ShoesHomePage;
