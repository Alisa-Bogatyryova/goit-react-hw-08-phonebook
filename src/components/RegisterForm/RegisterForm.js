import * as Yup from 'yup';

import { Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';

import React from 'react';
import { TextField } from 'formik-material-ui';
import authOperations from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2),
  },
}));

export default function RegisterForm() {
  const isLoading = useSelector(authSelectors.getIsLoading);
  const dispatch = useDispatch();
  const c = useStyles();

  return (
    <div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(7, 'Password should be at least 7 symbols')
            .max(15, 'Password should be maximum 15 symbols')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authOperations.register(values));
          setSubmitting(false);
        }}
      >
        <Form>
          <Field
            component={TextField}
            className={c.field}
            name="name"
            type="text"
            label="User name"
          />
          <br />
          <Field
            component={TextField}
            className={c.field}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            className={c.field}
            name="password"
            type="password"
            label="Password"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            type="submit"
          >
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
}