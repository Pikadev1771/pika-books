import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useUser from 'hooks/useUser';
import { authService } from 'booksFirebase';
import { updatePassword, updateProfile } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const MyInfo = () => {
  const userObj = useUser();

  const [signupErrorMessage, setSignupErrorMessage] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOption, setAlertOption] = useState({
    severity: 'error',
    value: '',
  });

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

  const handleAlertClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  // 유효성 검사
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

  // 회원 정보 수정
  const onSubmit = async (form) => {
    // form 초기값('') 수정
    for (let prop in form) {
      if (!form[prop].length) {
        form[prop] = userObj[prop];
      }
    }

    try {
      await updatePassword(authService.currentUser, form.pw);
      await updateProfile(authService.currentUser, {
        displayName: form.nickname,
      });
      setAlertOpen(true);
      setAlertOption({
        severity: 'success',
        value: '내 정보가 수정되었습니다',
      });
    } catch (error) {
      setAlertOpen(true);
      setAlertOption({
        severity: 'error',
        value: '내 정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요',
      });
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputSet>
          <LabelAndInput>
            <Label htmlFor="email">이메일</Label>
            <Text>{userObj?.email}</Text>
          </LabelAndInput>
        </InputSet>
        <InputSet>
          <LabelAndInput>
            <Label htmlFor="pw">
              비밀번호<Required>*</Required>
            </Label>
            <InputContainer>
              <Input
                id="pw"
                type={showPassword ? 'text' : 'password'}
                placeholder="새 비밀번호를 입력해주세요"
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
          </LabelAndInput>
          {errors?.pw?.type === 'required' && (
            <ErrorMessage>새 비밀번호를 입력해주세요</ErrorMessage>
          )}
          {errors?.pw?.type === 'pattern' && (
            <ErrorMessage>
              소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
            </ErrorMessage>
          )}
        </InputSet>
        <InputSet>
          <LabelAndInput>
            <Label htmlFor="pwConfirm">
              비밀번호 확인<Required>*</Required>
            </Label>
            <InputContainer>
              <Input
                id="pwConfirm"
                type={showPwConfirm ? 'text' : 'password'}
                placeholder="새 비밀번호를 다시 한 번 입력해 주세요"
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
          </LabelAndInput>
          {errors?.pwConfirm?.type === 'required' && (
            <ErrorMessage>새 비밀번호를 한 번 더 입력해주세요</ErrorMessage>
          )}
          {errors?.pwConfirm?.type === 'validate' && (
            <ErrorMessage>새 비밀번호가 일치하지 않습니다</ErrorMessage>
          )}
        </InputSet>
        <InputSet>
          <LabelAndInput>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              defaultValue={userObj?.displayName}
              onKeyPress={handleKeyPress}
              {...register('nickname', {
                pattern: nicknameRegex,
              })}
            />
          </LabelAndInput>
          {errors?.nickname?.type === 'pattern' && (
            <ErrorMessage>
              2자 이상 16자 이하, 영어, 숫자 또는 한글로 구성되어야 합니다.
            </ErrorMessage>
          )}
        </InputSet>
        <ButtonContainer>
          <SignupErrorMessage>{signupErrorMessage}</SignupErrorMessage>
          <LogInBtn type="submit">수정</LogInBtn>
        </ButtonContainer>
      </Form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Alert severity={alertOption?.severity}>
          <AlertTitle>{alertOption?.value}</AlertTitle>
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border: 4px solid black;
  margin-bottom: 20px;
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;

  margin: 0 auto;

  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  height: 100px;
`;

const LabelAndInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 20px;
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

const Text = styled.p`
  width: 450px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

const ErrorMessage = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding-left: 10px;
  width: 100%;
  text-align: right;
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

const LogInBtn = styled.button`
  width: 450px;
  height: 70px;
  padding: 10px 0;
  margin: 10px;

  color: white;
  background-color: black;
  font-size: 20px;
  font-weight: 600;

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

export default MyInfo;
