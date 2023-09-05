import styled from 'styled-components';

export const CategoriesWrapper = styled.ul`
  margin-top: 100px;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 20px;
  background-color: white;
  max-width: 350px;
  z-index:50;
  gap: 5px 0px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
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
