import { Helmet } from 'react-helmet-async';
import AuthLoginView from 'src/sections/_shoes/view/AuthLoginView';
// sections

// ----------------------------------------------------------------------

export default function AuthLogin() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <AuthLoginView />
    </>
  );
}
