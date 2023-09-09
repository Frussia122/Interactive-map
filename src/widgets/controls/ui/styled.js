import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  height: 100vh;
  width: 400px;
  z-index: 1005;
  top: 0;
  left: 0;
  position: absolute;
  transition: all 0.2s linear;

  @media(max-width: 600px) {
    width: 341px;
  }
`;
export default Wrapper;
