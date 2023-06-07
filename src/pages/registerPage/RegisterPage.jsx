import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from 'pages/images/logo.svg';


import SignUp from '../../components/signUp/SignUp';


const LogoImg = styled.div`
    background-image: url(${logo});  
    background-repeat: no-repeat;
    background-size: contain;
    height: 200px;
    position: absolute;
    top: 20px;
    transform: rotate(90deg);
    left: -120px;
    width: 200px;
`

const Wrapper = styled.section`
  margin: 0 auto;
  padding-top: 25vh;
  width: 50%
`

const Title = styled.h1`
  text-align: center;
  font-size: 35px;
`
const ActionButton = styled.div`
  color: gray;
  text-decoration: none;
  text-align: center;
  font-weight: normal;
  
`

const ActionLink = styled(Link)`
  color: #5551ff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;


function RegisterPage() {
  return (
    <Wrapper>
        <LogoImg ></LogoImg>
        <Title>Sign up for Traveler</Title>
        <SignUp />
        <ActionButton>
        Already have an account? <ActionLink   to='/login'>Log in</ActionLink >
        </ActionButton>
    </Wrapper>
  )
}

export default RegisterPage