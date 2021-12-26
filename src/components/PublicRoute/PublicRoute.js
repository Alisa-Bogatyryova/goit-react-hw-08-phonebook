import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import authSelectors from '../../redux/auth/auth-selectors';
import { useSelector } from 'react-redux';

export default function PublicRoute({
  children,
  redirectTo = '/',
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Route {...routeProps}>
      {restricted && isLoggedIn ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}