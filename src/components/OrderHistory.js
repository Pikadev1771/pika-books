import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { dbService } from 'booksFirebase';
import { doc, getDoc } from 'firebase/firestore';

const OrderHistory = ({ userObj }) => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState();

  const getOrderList = async () => {
    const docRef = doc(dbService, 'order', userObj?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOrderList(docSnap.data().orderList.reverse());
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      <Wrapper>
        {orderList ? (
          orderList?.map((order) => (
            <Order>
              <OrderDate>{order.orderedAt.slice(0, 10)}</OrderDate>
              {order?.orderItems?.map((item) => (
                <ItemBox>
                  <ItemSummary onClick={() => navigate(`/book/${item.id}`)}>
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
                      <Shipping>배송 중</Shipping>
                    </PriceAndQuantity>
                  </ItemAdjustment>
                </ItemBox>
              ))}
              <Total>
                <SubText>
                  상품 금액 {order.totalPrice.toLocaleString()}원 + 배송비 0원 =
                </SubText>
                총 결제 금액 {order.totalPrice.toLocaleString()}원
              </Total>
            </Order>
          ))
        ) : (
          <NoItemBox>
            <p>주문 내역이 없습니다</p>
          </NoItemBox>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Order = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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
  padding: 20px;
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
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  line-height: 1.2;
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
  font-size: 20px;
  font-weight: 600;
  width: 100px;
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

const NoItemBox = styled.div`
  ${({ theme }) => theme.flexCenter};
  padding: 20px;
  margin-bottom: 20px;
  height: 500px;
  font-size: 22px;
  border: 4px solid black;
  width: 100%;
`;

export default OrderHistory;
