import styled from 'styled-components';

export const Wrapper = styled.div`
position: absolute;
z-index: 1050;
width: 320px;
padding: 80px 0 0 0;
right: 0;
top: 0;
background-color: white;
transition: all 0.2s linear;
height: 90%;
overflow-y: auto;
padding-bottom: 60px;

`;
export const Button = styled.button`
cursor: pointer;
position: absolute;
z-index: 1051;
right: 20px;
top: 20px;
background-color: #4d4d4d;
border: none;
padding: 10px;
border-radius: 8px;
svg{
  font-size: 20px;
  color: white;
}
@media(max-width: 600px) {
  right: 10px;
  top: 16px;
  svg{
    font-size: 14px;
  }
}
`;

export const Empty = styled.div`
font-size: 24px;
text-align: center;
`;
