import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'booksFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate('/')}>
        <img src="/logo/Logo.svg" width="560" height="120" alt="mypage" />
      </Logo>
      <NotFoundText>존재하지 않는 페이지입니다</NotFoundText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 50px;
`;

const Logo = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const NotFoundText = styled.p`
  font-size: 26px;
`;
export default NotFound;
