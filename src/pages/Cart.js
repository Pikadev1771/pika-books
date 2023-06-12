import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { SET_QUANTITY, REMOVE_FROM_CART } from 'store/slice/cartSlice';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';

import CartItem from 'components/CartItem';
import OrderTotal from 'components/OrderTotal';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const Cart = () => {
  const dispatch = useDispatch();

  // 카트 내 전체 아이템 (ID & 수량 정보)
  const cartItems = useSelector((state) => state.cartReducer);

  // 카트 내 전체 아이템 ID 모음
  const cartItemIds = cartItems?.map((item) => item.itemId);

  // 선택된 아이템 ID 모음 (초기값은 전체 선택 상태)
  const [checkedItemIds, setCheckedItemIds] = useState(cartItemIds);

  // 도서 목록
  const [bookList, setBookList] = useState([]);

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

  // 카트 내 도서 목록 (장바구니 추가 순 정렬)
  const bookInCartList = bookList
    ?.filter((book) => cartItemIds?.indexOf(book.id) !== -1)
    .sort((a, b) => cartItemIds.indexOf(a.id) - cartItemIds.indexOf(b.id));

  console.log('bookInCartList >>', bookInCartList);

  // 아이템 선택 변경
  const handleCheckChange = (id, checked) => {
    if (checked) {
      setCheckedItemIds([...checkedItemIds, id]);
    } else {
      setCheckedItemIds(checkedItemIds?.filter((itemId) => itemId !== id));
    }
  };

  // 아이템 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItemIds(cartItemIds);
    } else {
      setCheckedItemIds([]);
    }
  };

  // 아이템 수량 변경
  const handleQuantityChange = (id, quantity) => {
    dispatch(SET_QUANTITY({ id, quantity }));
  };

  // 아이템 삭제
  const handleDelete = (id) => {
    setCheckedItemIds(checkedItemIds?.filter((itemId) => itemId !== id));
    dispatch(REMOVE_FROM_CART({ id }));
  };

  // 선택한 아이템 total 정보
  const getTotal = () => {
    let total = {
      numOfItems: checkedItemIds?.length,
      quantity: 0,
      price: 0,
    };

    // 카트 내 아이템들을 하나씩 순회
    for (let i = 0; i < cartItemIds.length; i++) {
      if (checkedItemIds?.indexOf(cartItemIds[i]) !== -1) {
        // 선택된 아이템이면
        let itemQuantity = cartItems[i]?.quantity; // 해당 아이템 수량
        let itemPrice = bookList?.filter(
          // 해당 아이템 가격
          (book) => book.id === cartItems[i]?.itemId
        )[0]?.price;

        total.price += itemQuantity * itemPrice;
        total.quantity += itemQuantity;
      }
    }
    return total;
  };
  const total = getTotal(); // 주문 합계 관련 데이터

  // 선택된 도서 목록
  const selectedBookList = bookInCartList.filter(
    (book) => checkedItemIds.indexOf(book.id) !== -1
  );

  // 선택된 아이템 (ID & 수량 정보)
  const checkedItems = cartItems.filter(
    (item) => checkedItemIds.indexOf(item.itemId) !== -1
  );

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <TitleText>장바구니</TitleText>
          </PageTitle>
          <CheckAll>
            <input
              type="checkbox"
              checked={
                checkedItemIds.length === cartItemIds.length ? true : false
              }
              onChange={(e) => handleAllCheck(e.target.checked)}
            />
            <label>전체선택</label>
          </CheckAll>
          <CartContainer>
            <ItemsContainer>
              {bookInCartList.map((book) => {
                const quantity = cartItems.filter(
                  (item) => item.itemId === book.id
                )[0].quantity;
                return (
                  <CartItem
                    key={book.id}
                    bookData={book}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    checkedItemIds={checkedItemIds}
                    quantity={quantity}
                  />
                );
              })}
            </ItemsContainer>
            <OrderTotal
              total={total}
              selectedBookList={selectedBookList}
              checkedItems={checkedItems}
            />
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
