import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import BookCard from 'components/BookCard';
import { useNavigate } from 'react-router-dom';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import useLogin from 'hooks/useLogin';

export default function Main() {
  const navigate = useNavigate();
  const [init, isLoggedIn] = useLogin();

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'books'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((book) => ({
        id: book.id,
        ...book.data(),
      }));
      setBookList(bookArr);
    });
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <Title>도서 목록</Title>
            {isLoggedIn && (
              <AddBtn onClick={() => navigate('/addnew')}>책 등록하기</AddBtn>
            )}
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
}

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

const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
`;

const AddBtn = styled.button`
  width: 150px;
  color: white;
  background-color: black;
  border: none;
  padding: 14px;
  font-size: 20px;
  font-weight: 600;
`;
