import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function Search() {
  const navigate = useNavigate();

  const [bookList, setBookList] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'books'), orderBy('createdAt'));
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((book) => ({
        id: book.id,
        ...book.data(),
      }));
      setBookList(bookArr);
    });
  }, []);

  const handleFilterBooks = (e) => {
    setFilteredBooks(
      bookList.filter(
        (book) =>
          book.title.indexOf(e.target.value) !== -1 ||
          book.author.indexOf(e.target.value) !== -1 ||
          book.publisher.indexOf(e.target.value) !== -1
      )
    );
    e.target.value === '' && setFilteredBooks([]);
  };

  const handleItemClick = (bookId) => {
    setIsFilterModalOpen(false);
    navigate(`/book/${bookId}`);
  };

  return (
    <Filter>
      <SearchInput
        variant="standard"
        placeholder="책 제목, 저자명, 출판사로 검색해보세요"
        onChange={handleFilterBooks}
      />
      {filteredBooks.length ? (
        <SearchResult>
          {filteredBooks
            .map((book) => (
              <ItemBox onClick={() => handleItemClick(book.id)}>
                <BookImg src={`${book.bookImgUrl || '/books/Book.png'}`} />
                <Text>
                  <BookInfo>
                    <Title>{book.title}</Title>
                    <AuthorAndPublisher>{`${book.author} / ${book.publisher}`}</AuthorAndPublisher>
                  </BookInfo>
                  <Price>{`${book.price.toLocaleString()}원`}</Price>
                </Text>
              </ItemBox>
            ))
            .slice(0, 5)}
        </SearchResult>
      ) : null}
    </Filter>
  );
}

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 560px;
  z-index: 10;
`;

const SearchInput = styled.input`
  background-color: white;
  border: 4px solid black;
  width: 100%;
  height: 60px;
  padding: 18px;
  outline: none;
  font-size: 18px;

  :focus {
    outline: none;
  }
`;

const SearchResult = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  border: 4px solid black;
  padding: 0 20px;
  background-color: #f4f4f4;
`;

const ItemBox = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  margin: 20px 0;
`;

const BookImg = styled.img`
  border: 2px solid black;
  width: 100px;
  height: 100px;
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 20px;
  padding: 10px;
  font-weight: 400;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
`;

const Title = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const AuthorAndPublisher = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  font-weight: 400;
  font-size: 16px;
`;

const Price = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  width: 100px;
`;
