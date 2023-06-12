import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';

export default function BookCard({ book }) {
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
}

const CardContainer = styled.button`
  ${({ theme }) => theme.flexCenter};
  width: 530px;
  background-color: inherit;
  margin: 30px;
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

  @media screen and (max-width: 1250px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
  }

  @media screen and (max-width: 767px) {
    width: 80vw;
    height: 140px;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
  }
`;

const Title = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 26px;
  font-weight: 600;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;

  @media screen and (max-width: 1250px) {
    font-size: 14px;
    width: 70px;
    text-align: left;
  }

  @media screen and (max-width: 767px) {
    width: 100px;
    text-align: center;
    font-size: 14px;
  }
`;

const AuthorAndPublisher = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  font-weight: 400;
  font-size: 18px;

  @media screen and (max-width: 1250px) {
    font-size: 12px;
    -webkit-line-clamp: 1;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`;

const Price = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 1250px) {
    font-size: 12px;
    -webkit-line-clamp: 1;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`;
