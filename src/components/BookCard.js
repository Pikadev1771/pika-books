import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookCard = ({ book }) => {
  const { id, title, author, publisher, bookImgUrl, price } = book;
  return (
    <Link to={`/book/${id}`}>
      <CardContainer>
        <BookImg src={`${bookImgUrl || '/books/Book.png'}`} />
        <Text>
          <Title>{title}</Title>
          <AuthorAndPublisher>{`${author} / ${publisher}`}</AuthorAndPublisher>
          <Price>{`${price.toLocaleString()}원`}</Price>
        </Text>
      </CardContainer>
    </Link>
  );
};

const CardContainer = styled.button`
  ${({ theme }) => theme.flexCenter};
  width: 500px;
  background-color: inherit;
  margin: 20px;
  border: 4px solid black;
  padding: 40px;
`;

const BookImg = styled.img`
  border: 2px solid black;
  width: 210px;
  height: 280px;
`;

const Text = styled.div`
  width: 250px;
  height: 100%;
  margin-left: 20px;
  padding: 10px;
  font-weight: 400;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 24px;
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
  font-size: 18px;
`;

const Price = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export default BookCard;
