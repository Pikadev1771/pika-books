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
import OrderTotal from 'components/OrderTotal';
import CartItem from 'components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userObj = useUser();

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <TitleText>장바구니</TitleText>
          </PageTitle>
          <CheckAll>
            <input type="checkbox" checked={false}></input>
            <label>전체선택</label>
          </CheckAll>
          <CartContainer>
            <ItemsContainer>
              <CartItem />
              <CartItem />
              <CartItem />
            </ItemsContainer>
            <OrderTotal />
          </CartContainer>
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
const TitleText = styled.span`
  margin: 10px 0;
  font-size: 30px;
  font-weight: 600;
  display: flex;
`;

const CheckAll = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input {
    width: 20px;
    height: 20px;
  }

  label {
    margin-left: 6px;
    font-size: 20px;
  }
`;

const CartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
`;

const ItemsContainer = styled.div`
  width: 650px;
  /* border: 4px solid black; */
`;

export default Cart;
