import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { dbService } from 'booksFirebase';
import useUser from 'hooks/useUser';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { storageService } from 'booksFirebase';
import {
  getDownloadURL,
  ref,
  uploadString,
  deleteObject,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import moment from 'moment';

const Edit = () => {
  const navigate = useNavigate();
  const userObj = useUser();
  const params = useParams();

  const [imgUrl, setImgUrl] = useState();
  const [bookData, setBookData] = useState();

  const getBookData = async () => {
    const docRef = doc(dbService, 'books', params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const book = { ...docSnap.data(), id: params.id };
      setBookData(book);
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

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
    const previousImgUrl = bookData.bookImgUrl;

    // form 초기값('') 수정
    for (let prop in form) {
      if (!form[prop].length) {
        form[prop] = bookData[prop];
      }
    }

    // 이미지 여부에 따른 제출 폼 생성
    if (imgUrl) {
      const imgFileRef = ref(storageService, `${userObj.uid}/${nanoid()}`); // 이미지 파일 저장할 ref(문서) 생성 (유저 id를 기준으로 폴더 생성)
      const response = await uploadString(imgFileRef, imgUrl, 'data_url'); // 해당 문서에 이미지(URL) 추가
      const imgFileUrl = await getDownloadURL(response.ref); // 진짜 URL을 다운로드해서 변수에 저장

      form = {
        ...form,
        bookImgUrl: imgFileUrl,
        editedAt: moment(new Date()).format(),
        price: Number(form.price),
      };
    } else {
      form = {
        ...form,
        editedAt: moment(new Date()).format(),
        price: Number(form.price),
      };
    }

    const bookRef = doc(dbService, 'books', params.id);
    await updateDoc(bookRef, form);

    // 이전 책 이미지 지우기
    if (bookData.bookImgUrl) {
      const previousImgFileRef = ref(storageService, previousImgUrl);
      await deleteObject(previousImgFileRef);
    }
    navigate('/');
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          {bookData && (
            <>
              <PageTitle>
                <Title>도서 정보 수정</Title>
              </PageTitle>
              <ContentsContainer>
                <ImgBox>
                  <BookImg
                    src={imgUrl || bookData?.bookImgUrl || '/books/Book.png'}
                  />
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
                      defaultValue={bookData?.title}
                      {...register('title')}
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
                      defaultValue={bookData?.author}
                      {...register('author')}
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
                      defaultValue={bookData?.publisher}
                      {...register('publisher')}
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
                      onKeyPress={handleKeyPress}
                      defaultValue={bookData?.price}
                      {...register('price')}
                    />
                    {errors?.price?.type === 'required' && (
                      <ErrorMessage>판매 가격을 입력해주세요</ErrorMessage>
                    )}
                  </InputSet>

                  <SubmitBtn type="submit">수정</SubmitBtn>
                </Form>
              </ContentsContainer>
            </>
          )}
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

export default Edit;
