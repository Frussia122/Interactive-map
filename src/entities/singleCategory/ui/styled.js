import styled from 'styled-components';


export const CategoryItem = styled.li`
    cursor: pointer;
    text-align: center;
    list-style: none;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: column-reverse;
    svg{
      font-size: 25px;

    }
`;

export const Circle = styled.div`
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`