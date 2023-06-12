import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const OrderDetail = () => {
  // 주문 내역 전체 리스트에서 orderId 일치하는 주문 찾기

  const [orderList, setOrderList] = useState();

  useEffect(() => {
    const q = query(collection(dbService, 'order'), orderBy('createdAt'));
    onSnapshot(q, (snapshot) => {
      const orderArr = snapshot.docs.map((order) => ({
        id: order.id,
        ...order.data(),
      }));
      setOrderList(orderArr);
    });
  }, []);

  // 해당 주문의 책 데이터 - 도서 목록과 매칭

  return <div>주문 상세 페이지</div>;
};

export default OrderDetail;
