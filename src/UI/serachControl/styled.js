import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top:0;
  left: 0;
  z-index:1007;
`;
export const Form = styled.form`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: border-color 0.2s ease-in-out;

  &.focused {
    border-color: #0c8ce9;
  }
`;

export const Input = styled.input`
  padding: 15px 20px;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  background-color: #f6f6f6;
  outline: none;
  font-size: 14px;
`;

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
