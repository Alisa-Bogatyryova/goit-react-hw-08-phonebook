import {
    Card,
    CardContent,
    Container,
    LinearProgress,
    Paper,
    Tab,
    Tabs,
  } from '@material-ui/core';
  import { Link, Route, Switch, useLocation } from 'react-router-dom';
  import  authSelectors from '../../redux/auth/auth-selectors';
  import * as authActions from '../../redux/auth/auth-actions'
  
  import ErrorNotification from './../../components/ErrorNotification/ErrorNotification';
  import LoginForm from './../../components/LoginForm/LoginForm';
  import React from 'react';
  import RegisterForm from '../../components/RegisterForm/RegisterForm';
  import { makeStyles } from '@material-ui/core/styles';
  import { useSelector } from 'react-redux';
  
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(2),
    },
    cardContent: {
      textAlign: 'center',
    },
  }));
  
  export default function AuthPage() {
    const error = useSelector(authSelectors.getError);
    const isLoading = useSelector(authSelectors.getIsLoading);
    const routes = ['/login', '/register'];
    const location = useLocation();
    const c = useStyles();
  
    return (
      <Container maxWidth="sm" className={c.root}>
        <Card>
          <Paper square>
            <Tabs value={location.pathname} variant="fullWidth">
              <Tab
                value={routes[0]}
                label="Login"
                component={Link}
                to={routes[0]}
              />
              <Tab
                value={routes[1]}
                label="Register"
                component={Link}
                to={routes[1]}
              />
            </Tabs>
          </Paper>
          <CardContent>
            <Container className={c.cardContent}>
              <Switch>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route path="/register">
                  <RegisterForm />
                </Route>
              </Switch>
            </Container>
          </CardContent>
        </Card>
        {error && (
          <ErrorNotification message={error} action={authActions.resetError} />
        )}
        {isLoading && <LinearProgress />}
      </Container>
    );
  }