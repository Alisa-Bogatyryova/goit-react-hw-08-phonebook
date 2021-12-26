import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import {default as authOperations} from '../../redux/auth/auth-operations';
import  authSelectors  from '../../redux/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2),
  },
}));

export default function LoginForm() {
  const isLoading = useSelector(authSelectors.getIsLoading);
  const dispatch = useDispatch();
  const c = useStyles();

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(7, 'Password should be at least 7 symbols')
            .max(15, 'Password should be maximum 15 symbols')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authOperations.logIn(values));
          setSubmitting(false);
        }}
      >
        <Form>
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
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
}