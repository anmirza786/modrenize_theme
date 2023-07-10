import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import AuthGuard from 'src/components/guards/AuthGuard';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const OTPConfirmation = Loadable(lazy(() => import('../views/authentication/OTPConfirmation')));
const ForgetPassword = Loadable(lazy(() => import('../views/authentication/ForgetPasswordPage')));
const ConfirmPassword = Loadable(lazy(() => import('../views/authentication/ConfirmPassword')));

const Router = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      // { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/otp-confirmation', element: <OTPConfirmation /> },
      { path: '/auth/confirm-password', element: <ConfirmPassword /> },
      { path: '/auth/forget-password', element: <ForgetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
