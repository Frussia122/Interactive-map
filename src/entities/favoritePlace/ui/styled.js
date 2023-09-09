import styled from 'styled-components';


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