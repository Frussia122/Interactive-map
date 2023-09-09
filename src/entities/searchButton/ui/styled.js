import styled from 'styled-components';


export const Button = styled.button`
  height: 48px;
  width: 48px;
  margin: 0;
  border: none;
  background-color: #f6f6f6;
  font-size: 20px;
  cursor: pointer;
  color: black;
  transition: all .2s linear;
  border-left: 1px solid #c9c9c9;
  border-right: 1px solid #c9c9c9;
  &:hover{
    color: red;
  }
`;
