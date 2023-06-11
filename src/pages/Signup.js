import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'booksFirebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignupPage = () => {
  const navigate = useNavigate();

  const [signupErrorMessage, setSignupErrorMessage] = useState();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // 비번 보이기 / 숨기기
  const [showPassword, setShowPassword] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleShowPwConfirm = (e) => {
    e.preventDefault();
    setShowPwConfirm((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
    }
  };

  // 유효성 검사
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

  // 회원가입 요청
  const onSubmit = async (form) => {
    const { email, pw, nickname } = form;
    try {
      const res = await createUserWithEmailAndPassword(authService, email, pw);
      await updateProfile(authService.currentUser, { displayName: nickname });
      navigate('/');
    } catch (error) {
      if (error.code === `auth/email-already-in-use`) {
        setSignupErrorMessage('이미 존재하는 이메일입니다');
      }
    }
  };

  return (
    <>
      <SignupLayout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HomeBtnContainer onClick={() => navigate('/')}>
            <img src="/logo/Logo.svg" width="500" height="120" alt="home" />
          </HomeBtnContainer>
          <InputSet>
            <Label htmlFor="id">
              Email<Required>*</Required>
            </Label>
            <Input
              id="email"
              placeholder="이메일을 입력해주세요"
              onKeyPress={handleKeyPress}
              {...register('email', {
                required: true,
                pattern: emailRegex,
              })}
            />
            {errors?.email?.type === 'required' && (
              <ErrorMessage>이메일을 입력해주세요</ErrorMessage>
            )}

            {errors?.email?.type === 'pattern' && (
              <ErrorMessage>
                2자 이상 16자 이하, 영어, 숫자 또는 한글로 구성되어야 합니다.
              </ErrorMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pw">
              Password<Required>*</Required>
            </Label>
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
              <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>
            )}
            {errors?.pw?.type === 'pattern' && (
              <ErrorMessage>
                소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
              </ErrorMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pwConfirm">
              Password Confirm<Required>*</Required>
            </Label>
            <InputContainer>
              <Input
                id="pwConfirm"
                type={showPwConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                onKeyPress={handleKeyPress}
                {...register('pwConfirm', {
                  required: true,
                  validate: (value) => {
                    const password = watch('pw');
                    return password === value;
                  },
                })}
              />
              <EyeBtn onClick={handleShowPwConfirm}>
                {showPwConfirm ? (
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
            {errors?.pwConfirm?.type === 'required' && (
              <ErrorMessage>비밀번호를 한 번 더 입력해주세요</ErrorMessage>
            )}
            {errors?.pwConfirm?.type === 'validate' && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              onKeyPress={handleKeyPress}
              {...register('nickname', {
                pattern: nicknameRegex,
              })}
            />
            {errors?.nickname?.type === 'pattern' && (
              <ErrorMessage>
                2자 이상 16자 이하, 영어, 숫자 또는 한글로 구성되어야 합니다.
              </ErrorMessage>
            )}
          </InputSet>
          <ButtonContainer>
            <SignupErrorMessage>{signupErrorMessage}</SignupErrorMessage>
            <LogInBtn type="submit" value={'Sign Up'} />
            <LinkContainer>
              이미 가입한 회원이신가요?
              <LinkBtn onClick={() => navigate('/login')}>Log In</LinkBtn>
            </LinkContainer>
          </ButtonContainer>
        </Form>
      </SignupLayout>
    </>
  );
};

export default SignupPage;

const SignupLayout = styled.div`
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
  height: 1000px;
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
  margin-bottom: 14px;
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

const ErrorMessage = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding-left: 10px;
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

const SignupErrorMessage = styled.p`
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

  :hover {
    cursor: pointer;
  }
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.blue};
  font-size: 22px;
`;
