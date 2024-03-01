import { useEffect } from 'react';
import { useLocation } from 'react-router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { Toastify } from 'src/components/toastify/Toastify';
import { useSelector } from 'src/redux/store';
import ShoesCategory from '../components/ShoesCategory';
import ShoesFeature from '../layout/shoes/ShoesFeature';
import ShoesFooter from '../layout/shoes/ShoesFooter';
import ShoesHeader from '../layout/shoes/ShoesHeader';
import ShoesSale from '../layout/shoes/ShoesSale';
import ShoesSlide from '../layout/shoes/ShoesSlide';
import ShoesTopSell from '../layout/shoes/ShoesTopSell';

const pathsOnDark = ['/career/landing', '/travel/landing'];
const ShoesHomeView = () => {
  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    console.log('user', userProfile);
  }, [userProfile]);
  const { pathname } = useLocation();
  const actionPage = (arr: string[]) => arr.some((path) => pathname === path);
  return (
    <LoadingScreen /> && (
      <>
        <ShoesHeader headerOnDark={actionPage(pathsOnDark)} />
        <ShoesSlide />
        <ShoesSale />
        <ShoesCategory />
        <ShoesFeature />
        <ShoesTopSell />
        <ShoesFooter />
        <Toastify />
      </>
    )
  );
};

export default ShoesHomeView;
