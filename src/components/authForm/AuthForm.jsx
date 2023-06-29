/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Formik,
} from 'formik';
import {
  AuthWraper,
  AuthButton,
  AuthInput,
  Error,
} from './styled';

function AuthForm({ title, handleClick, type }) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        userName: '',
      }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 6) {
          errors.password = 'Password must be at least 6 characters long';
        }

        if (type === 'registration' && !values.userName) {
          errors.userName = 'Username is required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleClick(values);
        setSubmitting(false);
      }}
    >
      <AuthWraper>
        {type === 'registration' && (
        <>
          <AuthInput type="text" name="userName" placeholder="Username" />
          <Error name="userName" component="div" className="error" />
        </>
        )}
        <AuthInput type="email" name="email" placeholder="Email" />
        <Error name="email" component="div" className="error" />
        <AuthInput type="password" name="password" placeholder="Password" />
        <Error name="password" component="div" className="error" />
        <AuthButton type="submit">{title}</AuthButton>
      </AuthWraper>
    </Formik>
  );
}

export default AuthForm;
