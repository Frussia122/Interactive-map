import styled from 'styled-components';


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
  @media(max-width: 600px) {
    width:140px;
    font-size:12px;
  }
`;