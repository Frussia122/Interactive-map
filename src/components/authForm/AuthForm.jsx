import { useState } from 'react';
import styled from 'styled-components';





const AuthWraper = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0 auto;
  max-width: 350px;
 
`;
const AuthInput = styled.input`
  width:100%;
  margin-bottom: 20px;
  border-radius:4px;
  padding: 15px 10px;
  font-size: 18px;
  outline:none;
  border: 4px solid black;
  font-weight: bold;
  
  &:focus {
    border: 4px solid #5551ff;
  }

`;

const AuthButton = styled.button`
  border-radius:10px;
  color: white;
  background-color: black;
  width:325px;
  padding: 15px 10px;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all .2s linear;
  &:hover{
    transform: translateY(-5px);
  }
`;


function AuthForm({title, handleClick, type}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
   

  return (
    type === 'login' ? (
      <AuthWraper>
        <AuthInput 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder = "Email"/>

        <AuthInput 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder = "Password"/>

        <AuthButton
          onClick={() => handleClick(email, password)}>
          {title}
        </AuthButton>
      </AuthWraper>
    ) : (
      <AuthWraper>
        <AuthInput 
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} 
          placeholder = "FirstName"/>
          
        <AuthInput 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder = "Email"/>

        <AuthInput 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder = "Password"/>

        <AuthButton
          onClick={() => handleClick(email, password, userName)}>
          {title}
        </AuthButton>
      </AuthWraper>
    )
  );
}

export default AuthForm;