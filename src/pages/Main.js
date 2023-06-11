import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import BookCard from 'components/bookCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dbService } from 'booksFirebase';
import {
  getDocs, // temp
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

const Main = () => {
  const navigate = useNavigate();
  // const bookList = useSelector((state) => state.bookReducer.books);

  const [bookList, setBookList] = useState([]);

  // const getBookList = async () => {
  //   const querySnapshot = await getDocs(collection(dbService, 'books'));
  //   console.log(querySnapshot);
  //   querySnapshot.forEach((doc) => {
  //     const booksObj = { ...doc.data(), id: doc.id };
  //     setBookList((prev) => [...prev, booksObj]);
  //   });
  // };

  useEffect(() => {
    // getBookList();
    const q = query(collection(dbService, 'books'), orderBy('createdAt'));
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((book) => ({
        id: book.id,
        ...book.data(),
      }));
      setBookList(bookArr);
    });
  }, []);

  console.log(bookList);
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <Title>도서 목록</Title>
            <AddBtn onClick={() => navigate('/addnew')}>▶ 책 등록하기</AddBtn>
          </PageTitle>
          <List>
            {bookList?.map((book) => {
              return <BookCard key={book.id} book={book} />;
            })}
          </List>
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

  @media screen and (max-width: 767px) {
    height: 100%;
    flex-direction: column;
  }
`;

const PageTitle = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 15px;
  }
`;
const Title = styled.span`
  margin: 10px 0;
  font-size: 30px;
  font-weight: 600;
  display: flex;
`;

const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 1100px) {
    justify-content: center;
  }

  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`;

const AddBtn = styled.button`
  color: white;
  background-color: black;
  border: none;
  padding: 14px;
  font-size: 20px;
  font-weight: 600;
`;

export default Main;
