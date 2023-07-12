import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import AuthGuard from 'src/components/guards/AuthGuard';
import RoleListing from 'src/views/settings/RoleListing';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Settings = Loadable(lazy(() => import('../views/settings/Settings')));
const AccountSettings = Loadable(
  lazy(() => import('../views/settings/account-settings/AccountSettings')),
);
const AddUser = Loadable(lazy(() => import('../views/settings/user-listing/add-user/AddUser')));
const EditUser = Loadable(lazy(() => import('../views/settings/user-listing/edit-user/EditUser')));
const UserListing = Loadable(lazy(() => import('../views/settings/user-listing/UserListing')));
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
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/settings', exact: true, element: <Settings /> },
      { path: '/settings/role-listing', exact: true, element: <RoleListing /> },
      { path: '/settings/account-settings', exact: true, element: <AccountSettings /> },
      { path: '/settings/user-listing', exact: true, element: <UserListing /> },
      { path: '/settings/user-listing/add-user', exact: true, element: <AddUser /> },
      { path: '/settings/user-listing/edit-user', exact: true, element: <EditUser /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
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
