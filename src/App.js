import { Redirect, Switch, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import authSelectors from './redux/auth/auth-selectors';
import {default as AuthOperations} from './redux/auth/auth-operations';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from './components/AppBar/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

const AuthPage = lazy(() =>
  import('pages/AuthPage/AuthPage' ),
);

const ContactsPage = lazy(() =>
  import('pages/ContactsPage/ContactsPage' ),
);

export default function App() {
  const dispatch = useDispatch();
  const isLogging = useSelector(authSelectors.getIsLogging);

  useEffect(() => {
    dispatch(AuthOperations.checkCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <CssBaseline />
      {isLogging ? (
        <LinearProgress />
      ) : (
        <>
          <AppBar />
          <Suspense fallback={<LinearProgress />}>
            <Switch>
              <PrivateRoute path="/" exact redirectTo="/login">
                <Redirect to="/contacts" />
              </PrivateRoute>
              <PublicRoute path="/login" restricted redirectTo="/contacts">
                <AuthPage />
              </PublicRoute>
              <PublicRoute path="/register" restricted redirectTo="/contacts">
                <AuthPage />
              </PublicRoute>
              <PrivateRoute path="/contacts">
                <ContactsPage />
              </PrivateRoute>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </div>
  );
}