import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 100px;
    display:flex;
    flex-direction: column;
    padding: 0 20px;
`;

export const Input = styled.input`
margin-bottom: 20px;
padding: 20px;
border-radius: 15px;
border:none;
background-color: #f6f6f6;
outline: 1 solid transparent;

&:focus {
    outline: 1px solid #196dff;
}
`;
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

export const TypeButton = styled.button`
    background-color: transparent;
    border: none;
    width: 50px;
    height: 50px;
    cursor: pointer;
    svg{
        color: #878787;
        font-size:20px;
    }
`;
export const TypesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;
export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
