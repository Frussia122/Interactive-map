import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    right: 50%;
    z-index: 1000;
    top: 20px;
`;
export const Button = styled.button`
    background-color: white;
    border: 1px solid transparent;
    height:50px;
    width:50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s linear;
    color: #A5A5A5;
    &:hover{
        color: black;
    }
`;
