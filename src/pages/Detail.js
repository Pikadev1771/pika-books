import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, REMOVE_FROM_CART } from 'store/slice/cartSlice';
import { useParams } from 'react-router-dom';
import { dbService } from 'booksFirebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { storageService } from 'booksFirebase';
import { deleteObject, ref } from 'firebase/storage';
import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userObj = useUser();

  const [bookData, setBookData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const isCreator = userObj && bookData && userObj.uid === bookData.creatorId;

  const getBookData = async () => {
    const docRef = doc(dbService, 'books', params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const book = { ...docSnap.data(), id: params.id };
      setBookData(book);
      setIsLoading(false);
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  const handleDelete = async () => {
    // firestore 문서 지우기
    const bookRef = doc(dbService, 'books', params.id);
    await deleteDoc(bookRef);

    // storage 문서 지우기
    if (bookData.bookImgUrl) {
      const bookImgUrlRef = ref(storageService, bookData.bookImgUrl);
      await deleteObject(bookImgUrlRef);
    }

    dispatch(REMOVE_FROM_CART({ id: params.id }));

    navigate('/');
  };

  const handleChangeQuantity = useCallback((e) => {
    setQuantity(Number(e.target.value));
  }, []);

  const handleAddCart = () => {
    dispatch(ADD_TO_CART({ id: params.id, quantity: quantity }));
    navigate('/cart');
  };

  return (
    <>
      <Header />
      {!isLoading && (
        <>
          {bookData ? (
            <Wrapper>
              <Container>
                <BookInfoContainer>
                  <BookInfo>
                    <Title>{bookData.title}</Title>
                    <AuthorAndPublisher>{`${bookData.author} | ${bookData.publisher}`}</AuthorAndPublisher>
                  </BookInfo>
                  {isCreator && (
                    <Menu>
                      <MenuBtn onClick={() => navigate(`/edit/${bookData.id}`)}>
                        수정
                      </MenuBtn>
                      <MenuBtn onClick={handleDelete}>삭제</MenuBtn>
                    </Menu>
                  )}
                </BookInfoContainer>
                <ContentsContainer>
                  <BookImg
                    src={`${bookData?.bookImgUrl || '/books/Book.png'}`}
                    width={450}
                    height={620}
                  />
                  <Contents>
                    <Content>
                      <span>판매가</span>
                      <span>{`${bookData?.price?.toLocaleString()}원`}</span>
                    </Content>
                    <Content>
                      <span>배송료</span>
                      <span>무료</span>
                    </Content>
                    <Content>
                      <span>수량</span>
                      <Quantity
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={handleChangeQuantity}
                      ></Quantity>
                    </Content>
                    <CartContainer>
                      <CartBtn onClick={handleAddCart}>장바구니</CartBtn>
                    </CartContainer>
                  </Contents>
                </ContentsContainer>
              </Container>
            </Wrapper>
          ) : (
            <NotFoundWrapper>
              <NotFoundText>존재하지 않는 도서입니다</NotFoundText>
            </NotFoundWrapper>
          )}
        </>
      )}
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
`;

const BookInfoContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.span`
  margin: 10px 0;
  font-size: 38px;
  font-weight: 600;
  display: flex;
`;

const AuthorAndPublisher = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  font-weight: 400;
  font-size: 24px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuBtn = styled.button`
  border: 2px solid black;
  width: 100px;
  margin-left: 10px;
  padding: 14px;
  font-size: 20px;
  font-weight: 600;
`;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const BookImg = styled.img`
  border: 2px solid black;
`;

const Contents = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Content = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  span {
    font-size: 30px;
  }
`;

const Quantity = styled.input`
  width: 200px;
  font-size: 30px;
  padding: 10px;
  text-align: center;
  border: 4px solid black;
  outline: none;

  :focus {
    outline: none;
  }
`;

const CartContainer = styled.div`
  width: 580px;
  border-top: 4px solid black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CartBtn = styled.button`
  width: 200px;
  color: white;
  background-color: black;
  border: none;
  margin-top: 30px;
  padding: 18px;
  font-size: 20px;
  font-weight: 600;
`;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 65vh;
  padding: 50px;
`;

const NotFoundText = styled.p`
  font-size: 26px;
`;

export default Detail;
