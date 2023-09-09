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
  @media(max-width: 600px) {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

