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

const OrderTotal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userObj = useUser();

  return (
    <TotalBox>
      <TotalTitle>주문 합계</TotalTitle>
      <Calculation>
        <span>상품 금액</span>
        <span>49000원</span>
      </Calculation>
      <Calculation>
        <span>배송료</span>
        <span>+0원</span>
      </Calculation>

      <TotalPriceAndOrderBtn>
        <TotalPrice>
          <span>결제 예정 금액</span>
          <span>49000원</span>
          {/* <Quantity type="number" value={1}></Quantity> */}
        </TotalPrice>
        <OrderBtn>주문하기</OrderBtn>
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
