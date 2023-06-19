import styled from 'styled-components';

export const CategoriesWrapper = styled.ul`
  position: absolute;
  right: 0;
  top: 50px;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 20px 5px 20px 20px;
  background-color: white;
  max-width: 350px;
  z-index:50;
  gap: 10px 0px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
export const CategorieItem = styled.li`
    cursor: pointer;
    text-align: center;
    list-style: none;
    display: flex;
    
    align-items: center;
    flex-direction: column-reverse;
    margin-right: 25px;
    font-size: 14px;
    svg{
      font-size: 22px;
    }
`;
export const SearchForm = styled.form`
    position: absolute;
    z-index: 20;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchInput = styled.input`
    
    height:33px;
    outline: none;
    border:none;
    font-size: 15px;
    padding-left: 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

`;

export const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    cursor: pointer;
    font-size: 18px;
    background-color: white;
    border: none;
    color: gray;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all 0.5s linear;
    &:hover{
        color: black;
    }
`;
