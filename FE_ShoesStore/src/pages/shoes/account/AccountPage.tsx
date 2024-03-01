import { Helmet } from 'react-helmet-async';
import LoadingScreen from 'src/components/loading-screen';
import AccountLayout from 'src/sections/_shoes/layout/account/AccountLayout';
// sections

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title>Account: Personal </title>
      </Helmet>
      {<LoadingScreen /> && <AccountLayout />}
    </>
  );
}
