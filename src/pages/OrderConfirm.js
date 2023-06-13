import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import useUser from 'hooks/useUser';

const OrderConfirml = ({ userObj }) => {
  const params = useParams();
  const [order, setOrder] = useState();

  console.log(userObj);

  const getOrder = async () => {
    const docRef = doc(dbService, 'order', userObj?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setOrder(
        docSnap
          .data()
          .orderList.filter((order) => order.orderId === params.id)[0]
      );
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  console.log(order);

  return (
    <>
      <Header />
      <Wrapper>
        <ConfirmText>주문이 완료되었습니다</ConfirmText>
        <Order>
          <OrderDate>{order?.orderedAt?.slice(0, 10)}</OrderDate>
          {order?.orderItems?.map((item) => (
            <ItemBox>
              <ItemSummary>
                <Thumbnail>
                  <img
                    src={item.bookImgUrl || '/books/Book.png'}
                    width={100}
                    height={130}
                    alt="bookImg"
                  />
                </Thumbnail>
                <ItemInfo>
                  <BookTitle>{item.title}</BookTitle>
                  <NumOfBooks>{`수량: ${item.quantity}개`}</NumOfBooks>
                </ItemInfo>
              </ItemSummary>
              <ItemAdjustment>
                <PriceAndQuantity>
                  <ItemTotalPrice>
                    {(item.price * item.quantity).toLocaleString()}원
                  </ItemTotalPrice>
                </PriceAndQuantity>
              </ItemAdjustment>
            </ItemBox>
          ))}
          <Total>
            <SubText>
              상품 금액 {order?.totalPrice?.toLocaleString()}원 + 배송비 0원 =
            </SubText>
            총 결제 금액 {order?.totalPrice?.toLocaleString()}원
          </Total>
        </Order>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  margin-top: 60px;
`;

const ConfirmText = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Order = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  border: 4px solid black;
  margin-bottom: 20px;
  padding: 40px;
`;

const OrderDate = styled.p`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #dcdcdc;
  padding: 20px 30px;
  margin-bottom: 20px;
`;

const ItemSummary = styled.div`
  display: flex;
  align-items: center;
`;

const Thumbnail = styled.div`
  margin-right: 20px;

  :hover {
    cursor: pointer;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  :hover {
    cursor: pointer;
  }
`;

const BookTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const NumOfBooks = styled.span`
  font-size: 20px;
`;

const ItemAdjustment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const PriceAndQuantity = styled.div`
  display: flex;
  align-items: center;
`;

const ItemTotalPrice = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const Shipping = styled.p`
  width: 100px;
  font-size: 16px;
  border: 2px solid black;
  padding: 10px;
  margin-left: 20px;
  text-align: center;
  background-color: white;
`;

const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 4px solid black;
  text-align: right;
  font-size: 24px;
  font-weight: 700;
  padding-top: 10px;
`;

const SubText = styled.span`
  font-weight: 400;
  font-size: 20px;
  margin-right: 6px;
`;

export default OrderConfirml;
