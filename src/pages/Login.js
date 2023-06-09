import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginErrorMessage, setLoginErrorMessage] = useState();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // 비번 보이기 / 숨기기
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // ID input 엔터 시 비번 보이기 방지
  const handleIdKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
    }
  };

  // Enter 시 로그인
  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  // 유효성 검사
  const idRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 로그인 요청
  const onSubmit = (form) => {};

  return (
    <>
      <LoginLayout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HomeBtnContainer onClick={() => navigate('/')}>
            <img src="/logo/Logo.svg" width="500" height="120" alt="home" />
          </HomeBtnContainer>
          <InputSet>
            <Label htmlFor="id">ID</Label>
            <Input
              id="id"
              placeholder="아이디를 입력해주세요"
              onKeyPress={handleIdKeyPress}
              {...register('id', {
                required: true,
                pattern: idRegex,
              })}
            />
            {errors?.id?.type === 'required' && (
              <HelpMessage>아이디를 입력해주세요</HelpMessage>
            )}

            {errors?.id?.type === 'pattern' && (
              <HelpMessage>아이디 양식에 맞게 입력해주세요</HelpMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pw">Password</Label>
            <InputContainer>
              <Input
                id="pw"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                onKeyPress={handleKeyPress}
                {...register('pw', {
                  required: true,
                  pattern: passwordRegex,
                })}
              />
              <EyeBtn onClick={handleShowPassword}>
                {showPassword ? (
                  <img
                    src="/login/closedeye.svg"
                    width="24"
                    height="24"
                    alt="not show password"
                  />
                ) : (
                  <img
                    src="/login/eye.svg"
                    width="24"
                    height="24"
                    alt="show password"
                  />
                )}
              </EyeBtn>
            </InputContainer>
            {errors?.pw?.type === 'required' && (
              <HelpMessage>비밀번호를 입력해주세요</HelpMessage>
            )}

            {errors?.pw?.type === 'pattern' && (
              <HelpMessage>
                소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
              </HelpMessage>
            )}
          </InputSet>
          <ButtonContainer>
            <LoginErrorMessage>{loginErrorMessage}</LoginErrorMessage>
            <LogInBtn type="submit" value={'Log In'} />
            <LinkContainer>
              아직 회원이 아니신가요?
              <LinkBtn onClick={() => navigate('/signup')}>Sign Up</LinkBtn>
            </LinkContainer>
          </ButtonContainer>
        </Form>
      </LoginLayout>
    </>
  );
};

export default LoginPage;

const LoginLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 780px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

const HomeBtnContainer = styled.button`
  margin: 10px 0;
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 70%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 18px;
  padding: 10px;
`;

const Input = styled.input`
  width: 450px;
  height: 70px;
  padding: 16px;
  background: white;
  border: 4px solid black;
  font-weight: 500;
  font-size: 18px;

  :focus {
    outline: none;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 14px;
  }
`;

const HelpMessage = styled.label`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding: 12px 0 4px 10px;
`;

const InputContainer = styled.div`
  position: relative;
`;
const EyeBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: inherit;
  border: none;
  position: absolute;
  top: 16px;
  right: 20px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    background-color: #efeeee;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const LoginErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.red};
  margin: 6px 0;
  font-weight: 400;
  font-size: 16px;
`;

const LogInBtn = styled.input`
  width: 450px;
  height: 70px;
  padding: 10px 0;
  margin: 10px;


  color: white;
  background-color: black;
  font-size: 20px;
  font-weight: 600;

  :hover {
    cursor: pointer;
    width: 600px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 16px;
  }
`;

const LinkContainer = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin: 20px auto;
`;

const LinkBtn = styled.button`
  width: 90px;
  height: 30px;
  margin-left: 8px;
  border: 2px solid black;

  font-size: 16px;
  font-weight: 600;
  /* text-decoration: underline; */
  :hover {
    cursor: pointer;
  }
`;
