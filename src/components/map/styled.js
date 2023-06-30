import styled from 'styled-components';

export const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 400px;
  z-index: 1005;
  top: 0;
  left: 0;
  position: absolute;
  transition: all 0.2s linear;
  overflow: hidden;
`;
export const Button = styled.button`
  position: absolute;
  z-index: 1006;
  height: 30px;
  width: 25px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #A5A5A5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #4d4d4d;
  left: 367px;
  cursor: pointer;
  top: 30px;
  transition: all 0.1s linear;

  &:hover{
    color: white;
  }
  @media(max-width: 600px) {
    left: 293px;
    cursor: pointer;
    top: 19px;
  }
`;

export const RouteButton = styled.button`
    position: absolute;
    height: 48px;
    z-index: 1010;
    left: 309px;
    top: 21.5px;
    width: 48px;
    margin: 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: none;
    background-color: #f6f6f6;
    font-size: 20px;
    cursor: pointer;
    color: black;
    transition: all .2s linear;
    @media(max-width: 600px) {
      left: 240px;
      top: 9.5px;
    }
`;
