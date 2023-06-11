import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import BookCard from 'components/bookCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { dbService } from 'booksFirebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { storageService } from 'booksFirebase';
import { deleteObject, ref } from 'firebase/storage';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userObj = useUser();

  const [bookData, setBookData] = useState();
  const [quantity, setQuantity] = useState(1);

  const isCreator = userObj && bookData && userObj.uid === bookData.creatorId;

  // const bookData = useSelector((state) => state.bookReducer.books).filter(
  //   (book) => book.id === params.id
  // )[0];

  const getBookData = async () => {
    const docRef = doc(dbService, 'books', params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('docSnap', docSnap.data());
      const book = { ...docSnap.data(), id: params.id };
      setBookData(book);
    } else {
      console.log('No such document!');
    }
  };

  console.log('bookData', bookData);

  useEffect(() => {
    getBookData();
  }, []);

  const handleDelete = async () => {
    // firestore 문서 지우기
    const bookRef = doc(dbService, 'books', params.id);
    await deleteDoc(bookRef);

    // storage 문서 지우기
    if (bookData.bookImgUrl) {
      const bookImgUrlRef = ref(storageService, bookData.bookImgUrl);
      console.log(bookImgUrlRef);
      await deleteObject(bookImgUrlRef);
    }

    navigate('/');
  };

  const handleChangeQuantity = useCallback((e) => {
    setQuantity(Number(e.target.value));
  }, []);

  return (
    <>
      <Header />
      {bookData && (
        <Wrapper>
          <Container>
            <BookInfoContainer>
              <BookInfo>
                <Title>{bookData.title}</Title>
                <AuthorAndPublisher>{`${bookData.author} | ${bookData.publisher}`}</AuthorAndPublisher>
              </BookInfo>
              {isCreator && (
                <Menu>
                  <MenuBtn onClick={() => navigate(`/edit/${bookData.id}`)}>
                    수정
                  </MenuBtn>
                  <MenuBtn onClick={handleDelete}>삭제</MenuBtn>
                </Menu>
              )}
            </BookInfoContainer>
            <ContentsContainer>
              <BookImg
                src={`${bookData.bookImgUrl || '/books/Book.png'}`}
                width={450}
                height={620}
              />
              <Contents>
                <Content>
                  <span>판매가</span>
                  <span>{`${bookData.price}원`}</span>
                </Content>
                <Content>
                  <span>배송료</span>
                  <span>무료</span>
                </Content>
                <Content>
                  <span>수량</span>
                  <Quantity
                    type="number"
                    value={quantity}
                    onChange={handleChangeQuantity}
                  ></Quantity>
                </Content>
                <CartContainer>
                  <CartBtn>장바구니</CartBtn>
                </CartContainer>
              </Contents>
            </ContentsContainer>
          </Container>
        </Wrapper>
      )}
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

  @media screen and (max-width: 767px) {
    height: 100%;
    flex-direction: column;
  }
`;

const BookInfoContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;

  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 15px;
  }
`;
const Title = styled.span`
  margin: 10px 0;
  font-size: 38px;
  font-weight: 600;
  display: flex;
`;

const AuthorAndPublisher = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  font-weight: 400;
  font-size: 24px;

  @media screen and (max-width: 1250px) {
    font-size: 12px;
    -webkit-line-clamp: 1;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuBtn = styled.button`
  border: 2px solid black;
  width: 100px;
  margin-left: 10px;
  padding: 14px;
  font-size: 20px;
  font-weight: 600;
`;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const BookImg = styled.img`
  border: 2px solid black;
`;

const Contents = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Content = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  span {
    font-size: 30px;
  }
`;

const Quantity = styled.input`
  width: 200px;
  font-size: 30px;
  padding: 10px;
  text-align: center;
  border: 4px solid black;
  outline: none;

  :focus {
    outline: none;
  }
`;

const CartContainer = styled.div`
  width: 580px;
  border-top: 4px solid black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CartBtn = styled.button`
  width: 200px;
  color: white;
  background-color: black;
  border: none;
  margin-top: 30px;
  padding: 18px;
  font-size: 20px;
  font-weight: 600;
`;

export default Detail;
