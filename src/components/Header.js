import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from 'booksFirebase';
import { signOut } from 'firebase/auth';
import useLogin from 'hooks/useLogin';
import useUser from 'hooks/useUser';
import Search from './Search';
import { REMOVE_ALL_FROM_CART } from 'store/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const [init, isLoggedIn] = useLogin();
  const userObj = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogOut = () => {
    signOut(authService);
    setIsModalOpen(false);

    // 장바구니 비우기
    dispatch(REMOVE_ALL_FROM_CART());
    navigate('/');
  };

  const handleGoMyPage = () => {
    navigate('/mypage');
    setIsModalOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        <img src="/logo/Logo.svg" width="560" height="120" alt="mypage" />
      </Logo>
      <SearchAndMenu>
        <Search />
        {init && (
          <>
            {isLoggedIn ? (
              <>
                <Link to={'/cart'}>
                  <MenuButton>
                    <img
                      src="/header/cart.svg"
                      width="40"
                      height="40"
                      alt="cart"
                    />
                  </MenuButton>
                </Link>
                <MenuButton onClick={openModalHandler}>
                  <img
                    src="/header/mypage.svg"
                    width="40"
                    height="40"
                    alt="mypage"
                  />
                </MenuButton>
              </>
            ) : (
              <LoginBtn onClick={() => navigate('/login')}>로그인</LoginBtn>
            )}
          </>
        )}
      </SearchAndMenu>
      {isModalOpen && <ModalBackdrop onClick={openModalHandler} />}
      {isModalOpen ? (
        <ModalBox onClick={(event) => event.stopPropagation()}>
          <ModalMenu onClick={handleGoMyPage}>마이 페이지</ModalMenu>
          <ModalMenu onClick={handleLogOut}>로그아웃</ModalMenu>
        </ModalBox>
      ) : null}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 2400px;
  height: 200px;
  padding: 0 60px;
  z-index: '10';
  position: relative;
  background-color: inherit;

  @media screen and (max-width: 767px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const Logo = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const SearchAndMenu = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    height: 100%;
  }
`;

const LoginBtn = styled.button`
  width: 120px;
  height: 60px;

  border: none;
  background-color: black;
  color: white;

  margin-left: 10px;

  font-size: 18px;
`;

const MenuButton = styled.button`
  padding: 10px;
  background-color: inherit;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
`;

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0);

  position: fixed; // 화면 전체
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalBox = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  background-color: ${({ theme }) => theme.color.background};

  width: 180px;
  height: 90px;
  border: 2px solid black;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 140px;
  right: 30px;
  padding: 10px 0;

  @media screen and (max-width: 767px) {
    flex-direction: row;
    width: 55vw;
    height: 50px;
    top: 240px;
    right: 30px;
    padding: 10px 0;
  }
`;

const ModalMenu = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
`;
