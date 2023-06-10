import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { css } from 'styled-components';

export default function BookCard({ id, title, author, publisher, img, price }) {
  return (
    <Link to={`/book/${id}`}>
      <CardContainer>
        <BookImg src={img} width={200} height={300} />
        <Text>
          <Title>{title}</Title>
          <AuthorAndPublisher>{`${author} / ${publisher}`}</AuthorAndPublisher>
          <Price>{`${price}원`}</Price>
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
  border: 2px solid black;
  padding: 30px;
`;

const BookImg = styled.img``;

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

const CartBtn = styled.button`
  color: white;
  background-color: black;
  border: none;
  margin-top: 10px;
  padding: 14px;
  font-size: 20px;
  font-weight: 600;
`;