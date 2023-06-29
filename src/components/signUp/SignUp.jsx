import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AuthForm from '../authForm/AuthForm';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = (values) => {
    const { email, password, userName } = values;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem('accessToken', user.accessToken);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .catch((error) => {
            throw new Error(`Error ${error}`);
          });
        navigate('/');
      })
      .catch((error) => {
        throw new Error(`Error ${error}`);
      });
  };

  return (
    <AuthForm title="Create Account" handleClick={handleRegistration} type="registration" />
  );
}

export default SignUp;
