import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { SET_QUANTITY, REMOVE_FROM_CART } from 'store/slice/cartSlice';

import CartItem from 'components/CartItem';
import OrderTotal from 'components/OrderTotal';
import { dbService } from 'booksFirebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default function Cart() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // 전체 도서 목록
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
    setIsLoading(false);
  }, []);

  // 카트 내 전체 아이템 (ID & 수량 )
  const cartItems = useSelector((state) => state.cartReducer);

  // 카트 내 전체 아이템 ID 모음
  const cartItemIds = useMemo(
    () => cartItems?.map((item) => item.itemId),
    [cartItems]
  );

  // 카트 내 도서 + 수량 정보
  const cartBooksData = useMemo(
    () =>
      bookList
        .filter((book) => cartItemIds?.indexOf(book.id) !== -1)
        .sort((a, b) => cartItemIds.indexOf(a.id) - cartItemIds.indexOf(b.id))
        .map((book) => {
          for (let item of cartItems) {
            if (item.itemId === book.id) {
              return { ...book, quantity: item.quantity };
            }
          }
        }),
    [bookList, cartItemIds, cartItems]
  );

  // 선택된 아이템 ID 모음 (초기값은 전체 선택 상태)
  const [checkedItemIds, setCheckedItemIds] = useState(cartItemIds);

  // 선택된 도서 + 수량 정보
  const checkedBooksData = useMemo(
    () =>
      cartBooksData.filter((book) => checkedItemIds.indexOf(book.id) !== -1),
    [cartBooksData, checkedItemIds]
  );

  // 아이템 전체 선택
  const handleAllCheck = useCallback(
    (checked) => {
      if (checked) {
        setCheckedItemIds((checkedItemIds) => cartItemIds);
      } else {
        setCheckedItemIds((checkedItemIds) => []);
      }
    },
    [cartItemIds]
  );

  // 아이템 선택 변경
  const handleCheckChange = useCallback((id, checked) => {
    if (checked) {
      setCheckedItemIds((checkedItemIds) => [...checkedItemIds, id]);
    } else {
      setCheckedItemIds((checkedItemIds) =>
        checkedItemIds?.filter((itemId) => itemId !== id)
      );
    }
  }, []);

  // 아이템 수량 변경
  const handleQuantityChange = useCallback(
    (id, quantity) => {
      dispatch(SET_QUANTITY({ id, quantity }));
    },
    [dispatch]
  );

  // 아이템 삭제
  const handleDelete = useCallback(
    (id) => {
      setCheckedItemIds((checkedItemIds) =>
        checkedItemIds?.filter((itemId) => itemId !== id)
      );
      dispatch(REMOVE_FROM_CART({ id }));
    },
    [dispatch]
  );

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <TitleText>장바구니</TitleText>
          </PageTitle>
          {cartBooksData.length ? (
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
          ) : null}
          <CartContainer>
            <ItemsContainer>
              {cartBooksData.length ? (
                cartBooksData.map((book) => {
                  return (
                    <CartItem
                      key={book.id}
                      bookData={book}
                      handleCheckChange={handleCheckChange}
                      handleQuantityChange={handleQuantityChange}
                      handleDelete={handleDelete}
                      checkedItemIds={checkedItemIds}
                      quantity={book.quantity}
                    />
                  );
                })
              ) : (
                <NoItemBox>
                  <p>장바구니에 담긴 상품이 없습니다</p>
                </NoItemBox>
              )}
            </ItemsContainer>
            <OrderTotal
              checkedBooksData={checkedBooksData}
              handleDelete={handleDelete}
            />
          </CartContainer>
        </Container>
      </Wrapper>
    </>
  );
}

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
`;

const PageTitle = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
`;

const NoItemBox = styled.div`
  ${({ theme }) => theme.flexCenter};

  padding: 20px;
  margin-bottom: 20px;
  height: 500px;
  font-size: 22px;
`;
