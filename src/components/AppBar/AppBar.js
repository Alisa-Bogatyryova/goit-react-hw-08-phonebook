import { AppBar as MUIAppBar, Toolbar, Typography } from '@material-ui/core';

import React from 'react';
import UserMenu from '../UserMenu/UserMenu';
import authSelectors from '../../redux/auth/auth-selectors';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const c = useStyles();

  return (
    <MUIAppBar position="relative">
      <Toolbar>
        <Typography className={c.title} variant="h4" component="h1">
          Phonebook
        </Typography>
        {isLoggedIn && <UserMenu />}
      </Toolbar>
    </MUIAppBar>
  );
}