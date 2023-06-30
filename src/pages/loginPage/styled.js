import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from 'pages/images/logo.svg';

export const LogoImg = styled.div`
    background-image: url(${logo});  
    background-repeat: no-repeat;
    background-size: contain;
    height: 200px;
    position: absolute;
    top: 20px;
    transform: rotate(90deg);
    left: -120px;
    width: 200px;
`;

export const Wrapper = styled.section`
  margin: 0 auto;
  padding-top: 25vh;
  width: 50%;
  @media(max-width: 600px) {
    width: 100%;
    padding-top: 19vh;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 35px;
`;
export const ActionButton = styled.div`
  color: gray;
  text-decoration: none;
  text-align: center;
  font-weight: normal;
`;

export const ActionLink = styled(Link)`
  color: #5551ff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
