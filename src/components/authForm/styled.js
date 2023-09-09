import styled from 'styled-components';
import { Field, ErrorMessage, Form } from 'formik';

export const AuthWraper = styled(Form)`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0 auto;
  max-width: 350px;
 
`;
export const AuthInput = styled(Field)`
  width:100%;
  border-radius:4px;
  padding: 15px 10px;
  font-size: 18px;
  outline:none;
  border: 4px solid black;
  font-weight: bold;
  margin-bottom: 25px;
  margin-top: 5px;
  &:focus {
    border: 4px solid #5551ff;
  }
  @media(max-width: 600px) {
    width: 300px;
  }

`;

export const AuthButton = styled.button`
  border-radius:10px;
  color: white;
  background-color: black;
  width:325px;
  padding: 15px 10px;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all .2s linear;
  &:hover{
    transform: translateY(-5px);
  }
`;
export const Error = styled(ErrorMessage)`
  color: red;
  font-size: 20px;
  width: 100%;
  margin-left: -20px;
  margin-top: -25px;
  text-align: left;
  @media(max-width: 600px) {
    margin-left: 20px;
  }
`;
