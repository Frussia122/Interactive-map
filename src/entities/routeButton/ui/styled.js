import styled from 'styled-components';

export const Button = styled.button`
    padding: 20px;
    border-radius: 15px;
    border: none;
    font-size: 15px;
    cursor: pointer;
    transition: all .2s linear;
    color: gray;
    &:hover{
        background-color: red;
        color: white;
    }
`;