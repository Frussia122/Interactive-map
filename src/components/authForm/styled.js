import styled from 'styled-components';

export const AuthWraper = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0 auto;
  max-width: 350px;
 
`;
export const AuthInput = styled.input`
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

export const AuthButton = styled.button`
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
