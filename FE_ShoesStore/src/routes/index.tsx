import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CompactLayout from '../layouts/compact';
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
//
import {
  CareerAboutPage,
  CareerBlogPage,
  CareerContactPage,
  // Career
  CareerJobPage,
  CareerJobsPage,
  CareerLandingPage,
  CareerPostPage,
  ComingSoonPage,
  ComponentsPage,
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoCountUpPage,
  DemoFormValidationPage,
  // Components
  DemoIconsPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMarkdownPage,
  DemoMegaMenuPage,
  DemoNavigationBarPage,
  DemoPlayerPage,
  DemoScrollbarPage,
  DemoTextMaxLinePage,
  EcommerceAccountOrdersPage,
  EcommerceAccountPaymentPage,
  EcommerceAccountPersonalPage,
  EcommerceAccountVouchersPage,
  EcommerceAccountWishlistPage,
  // E-Commerce
  EcommerceCartPage,
  EcommerceCheckoutPage,
  EcommerceComparePage,
  EcommerceLandingPage,
  EcommerceOrderCompletedPage,
  EcommerceProductPage,
  EcommerceProductsPage,
  EcommerceWishlistPage,
  ElearningAboutPage,
  // E-Learning
  ElearningBlogPage,
  ElearningContactPage,
  ElearningCoursePage,
  ElearningCoursesPage,
  ElearningLandingPage,
  ElearningPostPage,
  HomePage,
  LoginIllustrationPage,
  MaintenancePage,
  MarketingAboutPage,
  // Marketing
  MarketingBlogPage,
  MarketingCaseStudiesPage,
  MarketingCaseStudyPage,
  MarketingContactPage,
  MarketingLandingPage,
  MarketingPostPage,
  MarketingServicesPage,
  // Common
  Page404,
  Page500,
  PaymentPage,
  Pricing01Page,
  Pricing02Page,
  RegisterIllustrationPage,
  ResetPasswordPage,
  TravelAboutPage,
  // Travel
  TravelBlogPage,
  TravelCheckoutPage,
  TravelContactPage,
  TravelLandingPage,
  TravelOrderCompletedPage,
  TravelPostPage,
  TravelTourPage,
  TravelToursPage,
  VerifyCodePage,

  // Shoes
  ShoesHomePage,
  AccountPage,

  // Auth
  AuthLogin,
  AuthRegister,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Non layout

    {
      element: <SimpleLayout />,
      path: 'auth',
      children: [
        { path: 'login', element: <AuthLogin /> },
        { path: 'register', element: <AuthRegister /> },
      ],
    },

    // Shoes
    {
      path: 'shoes',
      children: [
        { path: 'home', element: <ShoesHomePage /> },
        {
          path: 'account',
          element: <AccountPage />,
        },
      ],
    },
    // Main layout
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        // { path: 'support', element: <SupportPage /> },
        // Marketing
        {
          path: 'marketing',
          children: [
            { path: 'landing', element: <MarketingLandingPage /> },
            { path: 'services', element: <MarketingServicesPage /> },
            { path: 'case-studies', element: <MarketingCaseStudiesPage /> },
            { path: 'case-study', element: <MarketingCaseStudyPage /> },
            { path: 'posts', element: <MarketingBlogPage /> },
            { path: 'post', element: <MarketingPostPage /> },
            { path: 'about', element: <MarketingAboutPage /> },
            { path: 'contact', element: <MarketingContactPage /> },
          ],
        },
        // Travel
        {
          path: 'travel',
          children: [
            { path: 'landing', element: <TravelLandingPage /> },
            { path: 'tours', element: <TravelToursPage /> },
            { path: 'tour', element: <TravelTourPage /> },
            { path: 'checkout', element: <TravelCheckoutPage /> },
            { path: 'order-completed', element: <TravelOrderCompletedPage /> },
            { path: 'posts', element: <TravelBlogPage /> },
            { path: 'post', element: <TravelPostPage /> },
            { path: 'about', element: <TravelAboutPage /> },
            { path: 'contact', element: <TravelContactPage /> },
          ],
        },
        // Career
        {
          path: 'career',
          children: [
            { path: 'landing', element: <CareerLandingPage /> },
            { path: 'jobs', element: <CareerJobsPage /> },
            { path: 'job', element: <CareerJobPage /> },
            { path: 'posts', element: <CareerBlogPage /> },
            { path: 'post', element: <CareerPostPage /> },
            { path: 'about', element: <CareerAboutPage /> },
            { path: 'contact', element: <CareerContactPage /> },
          ],
        },
        // E-learning
        {
          path: 'e-learning',
          children: [
            { path: 'landing', element: <ElearningLandingPage /> },
            { path: 'courses', element: <ElearningCoursesPage /> },
            { path: 'course', element: <ElearningCoursePage /> },
            { path: 'posts', element: <ElearningBlogPage /> },
            { path: 'post', element: <ElearningPostPage /> },
            { path: 'about', element: <ElearningAboutPage /> },
            { path: 'contact', element: <ElearningContactPage /> },
          ],
        },

        // E-commerce
        {
          path: 'e-commerce',
          children: [
            { path: 'landing', element: <EcommerceLandingPage /> },
            { path: 'products', element: <EcommerceProductsPage /> },
            { path: 'product', element: <EcommerceProductPage /> },
            { path: 'cart', element: <EcommerceCartPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
            { path: 'order-completed', element: <EcommerceOrderCompletedPage /> },
            { path: 'wishlist', element: <EcommerceWishlistPage /> },
            { path: 'compare', element: <EcommerceComparePage /> },
            {
              path: 'account',
              children: [
                { path: 'personal', element: <EcommerceAccountPersonalPage /> },
                { path: 'wishlist', element: <EcommerceAccountWishlistPage /> },
                { path: 'vouchers', element: <EcommerceAccountVouchersPage /> },
                { path: 'orders', element: <EcommerceAccountOrdersPage /> },
                { path: 'payment', element: <EcommerceAccountPaymentPage /> },
              ],
            },
          ],
        },
        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsPage />, index: true },
            { path: 'animate', element: <DemoAnimatePage /> },
            { path: 'carousel', element: <DemoCarouselsPage /> },
            { path: 'count-up', element: <DemoCountUpPage /> },
            { path: 'form-validation', element: <DemoFormValidationPage /> },
            { path: 'icons', element: <DemoIconsPage /> },
            { path: 'image', element: <DemoImagePage /> },
            { path: 'label', element: <DemoLabelPage /> },
            { path: 'lightbox', element: <DemoLightboxPage /> },
            { path: 'markdown', element: <DemoMarkdownPage /> },
            { path: 'mega-menu', element: <DemoMegaMenuPage /> },
            { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
            { path: 'scroll', element: <DemoScrollbarPage /> },
            { path: 'player', element: <DemoPlayerPage /> },
            { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
          ],
        },
      ],
    },
    // Simple layout
    {
      element: <SimpleLayout />,
      children: [
        { path: 'payment', element: <PaymentPage /> },
        { path: 'pricing-01', element: <Pricing01Page /> },
        { path: 'pricing-02', element: <Pricing02Page /> },
        // {
        //   path: 'auth',
        //   children: [
        //     { path: 'login-background', element: <LoginBackgroundPage /> },
        //     { path: 'login-illustration', element: <LoginIllustrationPage /> },
        //     { path: 'register-background', element: <RegisterBackgroundPage /> },
        //     { path: 'register-illustration', element: <RegisterIllustrationPage /> },
        //   ],
        // },
      ],
    },
    // Compact layout
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: 'reset-code', element: <ResetPasswordPage /> },
        { path: 'verify-code', element: <VerifyCodePage /> },
        {
          path: 'auth',
          children: [
            { path: 'reset-code', element: <ResetPasswordPage /> },
            { path: 'verify-code', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
