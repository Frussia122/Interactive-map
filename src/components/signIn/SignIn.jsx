import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'store/slices/userSlice';
import AuthForm from '../authForm/AuthForm';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem('accessToken', user.accessToken);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            userName: user.displayName,
          }),
        );
        navigate('/');
      })
      .catch(() => alert('Invalid user'));
  };

  return (
    <AuthForm title="Log In" handleClick={handleLogin} type="login" />
  );
}

export default SignIn;
