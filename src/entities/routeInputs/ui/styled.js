import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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