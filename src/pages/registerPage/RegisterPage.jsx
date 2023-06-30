import React from 'react';
import {
  LogoImg,
  Wrapper,
  Title,
  ActionButton,
  ActionLink,
} from 'pages/loginPage/styled';

import SignUp from '../../components/signUp/SignUp';

function RegisterPage() {
  return (
    <Wrapper>
      <LogoImg />
      <Title>Sign up for Traveler</Title>
      <SignUp />
      <ActionButton>
        Already have an account?
        <ActionLink to="/login">Log in</ActionLink>
      </ActionButton>
    </Wrapper>
  );
}

export default RegisterPage;
