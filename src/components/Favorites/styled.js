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
`;
export const Name = styled.div`
font-weight: semi-bold;
  margin: 0;
  font-size: 20px;
  color: #333333;
  transition: color 0.2s;
`;
export const Place = styled.div`
padding: 20px 30px;
border-bottom: 1px solid #eee;
display: flex;
flex-direction: column;
cursor: pointer;
transition: all 0.2s linear;
&:hover ${Name} {
  color: #0052cc;
}
&:hover{
  background-color: #e9e9e9;
}
`;

export const Address = styled.div`
font-size: 12px;
  margin: 5px 0;
  color: gray;
`;

export const Empty = styled.div`
font-size: 24px;
text-align: center;
`;
