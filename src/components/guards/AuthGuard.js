import React from 'react';
import { Navigate } from 'react-router-dom';
import { localStorageKeys } from 'src/utils/helpers';

// For routes that can only be accessed by authenticated users
const AuthGuard = ({ children }) => {
  const accessToken = localStorage.getItem(localStorageKeys.authToken);
  const userStr = localStorage.getItem(localStorageKeys.userObj);
  const user = userStr ? JSON.parse(userStr) : null;

  if (accessToken && user) {
    <Navigate to="/" />;
  } else {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
