import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUser from 'hooks/useUser';

import { dbService } from 'booksFirebase';
import { addDoc, collection } from 'firebase/firestore';
import { storageService } from 'booksFirebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { nanoid } from 'nanoid';
import moment from 'moment';

const AddNew = () => {
  const navigate = useNavigate();
  const userObj = useUser();

  const [imgUrl, setImgUrl] = useState(); // 이미지 URL (업로드 작업 할 동안 임시 사용 용도)

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
    }
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();

    // event listner 추가
    reader.onloadend = (finishedEvent) => {
      setImgUrl(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(imgFile);
  };

  const onSubmit = async (form) => {
    if (imgUrl) {
      const fileRef = ref(storageService, `${userObj.uid}/${nanoid()}`); // 이미지 파일 저장할 ref(폴더) 생성 (유저 id를 기준으로 폴더 생성)
      const response = await uploadString(fileRef, imgUrl, 'data_url'); // 해당 폴더에 이미지(URL) 추가
      const fileUrl = await getDownloadURL(response.ref); // 진짜 URL을 다운로드해서 변수에 저장

      form = {
        ...form,
        bookImgUrl: fileUrl,
        createdAt: moment(new Date()).format(),
        creatorId: userObj.uid,
        price: Number(form.price),
      };
    } else {
      form = {
        ...form,
        bookImgUrl: null,
        createdAt: moment(new Date()).format(),
        creatorId: userObj.uid,
        price: Number(form.price),
      };
    }

    await addDoc(collection(dbService, 'books'), form);
    navigate('/');
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <Title>도서 등록</Title>
          </PageTitle>
          <ContentsContainer>
            <ImgBox>
              <BookImg src={imgUrl || '/books/Book.png'} />
              <Upload
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </ImgBox>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputSet>
                <Label htmlFor="title">
                  제목<Required>*</Required>
                </Label>
                <Input
                  id="title"
                  onKeyPress={handleKeyPress}
                  {...register('title', {
                    required: true,
                  })}
                />
                {errors?.title?.type === 'required' && (
                  <ErrorMessage>제목을 입력해주세요</ErrorMessage>
                )}
              </InputSet>
              <InputSet>
                <Label htmlFor="author">
                  저자<Required>*</Required>
                </Label>
                <Input
                  id="author"
                  onKeyPress={handleKeyPress}
                  {...register('author', {
                    required: true,
                  })}
                />
                {errors?.author?.type === 'required' && (
                  <ErrorMessage>저자를 입력해주세요</ErrorMessage>
                )}
              </InputSet>
              <InputSet>
                <Label htmlFor="publisher">
                  출판사<Required>*</Required>
                </Label>
                <Input
                  id="publisher"
                  onKeyPress={handleKeyPress}
                  {...register('publisher', {
                    required: true,
                  })}
                />
                {errors?.publisher?.type === 'required' && (
                  <ErrorMessage>출판사를 입력해주세요</ErrorMessage>
                )}
              </InputSet>

              <InputSet>
                <Label htmlFor="price">
                  판매가<Required>*</Required>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  onKeyPress={handleKeyPress}
                  {...register('price', {
                    required: true,
                  })}
                />
                {errors?.price?.type === 'required' && (
                  <ErrorMessage>판매 가격을 입력해주세요</ErrorMessage>
                )}
              </InputSet>

              <SubmitBtn type="submit">등록</SubmitBtn>
            </Form>
          </ContentsContainer>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  margin: 60px auto;
  width: 80vw;
  padding: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
`;

const PageTitle = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.span`
  margin: 10px 0;
  font-size: 30px;
  font-weight: 600;
  display: flex;
`;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookImg = styled.img`
  border: 2px solid black;
  width: 450px;
  height: 620px;
`;

const Upload = styled.input`
  width: 250px;
  height: 50px;
  padding: 10px;
  margin-top: 30px;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-left: 120px;
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 22px;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
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

const SubmitBtn = styled.button`
  width: 100%;
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
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.blue};
  font-size: 22px;
`;

export default AddNew;
