import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import BookCard from 'components/bookCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { dbService } from 'booksFirebase';
import { addDoc, collection } from 'firebase/firestore';
import { storageService } from 'booksFirebase';
import { deleteObject, ref } from 'firebase/storage';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';

const OrderTotal = ({ total, selectedBookList, checkedItems }) => {
  const { numOfItems, quantity, price } = total;

  console.log(total);

  const navigate = useNavigate();

  const userObj = useUser();

  const shippingPrice = 0;

  const handleOrder = async () => {
    const orderId = nanoid();

    // 도서 정보 + 수량 정보
    const orderItems = selectedBookList.map((book) => {
      for (let item of checkedItems) {
        if (item.itemId === book.id) {
          return { ...book, quantity: item.quantity };
        }
      }
    });

    const orderForm = {
      orderId: orderId,
      userId: userObj.uid,
      orderedAt: moment(new Date()).format(),
      orderItems: orderItems,
      totalPrice: price,
    };

    await addDoc(collection(dbService, 'order'), orderForm);

    navigate(`/order/${orderId}`);
  };

  return (
    <TotalBox>
      <TotalTitle>주문 합계</TotalTitle>
      <ItemAndQuantity>
        <span>주문 상품</span>
        <span>{`총 ${numOfItems}종 ${quantity}권`}</span>
      </ItemAndQuantity>
      <Calculation>
        <span>상품 금액</span>
        <span>{price.toLocaleString()}원</span>
      </Calculation>
      <Calculation>
        <span>배송료</span>
        <span>+{shippingPrice.toLocaleString()}원</span>
      </Calculation>

      <TotalPriceAndOrderBtn>
        <TotalPrice>
          <span>결제 예정 금액</span>
          <span>{price.toLocaleString()}원</span>
        </TotalPrice>
        <OrderBtn onClick={handleOrder}>주문하기</OrderBtn>
      </TotalPriceAndOrderBtn>
    </TotalBox>
  );
};

const TotalBox = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 4px solid black;
  padding: 60px;
`;

const TotalTitle = styled.span`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 100px;
`;
const ItemAndQuantity = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  span {
    font-size: 24px;
  }
`;

const Calculation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  span {
    font-size: 24px;
  }
`;

const TotalPriceAndOrderBtn = styled.div`
  width: 100%;
  border-top: 4px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const TotalPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
`;

const OrderBtn = styled.button`
  width: 100%;
  color: white;
  background-color: black;
  border: none;
  margin-top: 30px;
  padding: 18px;
  font-size: 20px;
  font-weight: 600;
`;

export default OrderTotal;
