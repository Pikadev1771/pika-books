import styled from 'styled-components';
import Header from '../components/Header';

const Main = () => {
  return (
    <>
      <Header />
      <Wrapper>야호</Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  margin: 100px auto;
  width: 80vw;
  padding: 50px;
  background-color: #ffffff;
`;

export default Main;
