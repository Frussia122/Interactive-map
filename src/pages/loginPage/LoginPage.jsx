import SignIn from 'components/signIn/SignIn';
import React from 'react';
import {
  LogoImg,
  Wrapper,
  Title,
  ActionButton,
  ActionLink,
} from './styled';

function LoginPage() {
  return (
    <Wrapper>
      <LogoImg />
      <Title>Sign in to Traveler</Title>
      <SignIn />
      <ActionButton>
        No account?
        <ActionLink to="/register">Sign up</ActionLink>
      </ActionButton>
    </Wrapper>
  );
}

export default LoginPage;
