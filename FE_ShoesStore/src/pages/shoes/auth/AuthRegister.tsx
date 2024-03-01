import { Helmet } from 'react-helmet-async';
import AuthRegisterView from 'src/sections/_shoes/view/AuthRegisterView';
// sections

// ----------------------------------------------------------------------

export default function RegisterIllustrationPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <AuthRegisterView />
    </>
  );
}
