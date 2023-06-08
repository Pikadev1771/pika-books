import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function Header() {
  const navigate = useNavigate();
  const isLogin = true;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogOut = () => {
    console.log('로그아웃!');
  };

  const handleClickModalMenu = () => {
    navigate('/mypage');
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HeaderContainer>
      <Link to={'/'}>
        <Logo>PENTA BOOKS</Logo>
      </Link>

      <Menu>
        <Search placeholder="책 제목, 저자명으로 검색해보세요" />{' '}
        {isLogin ? (
          <>
            <Link to={'/cart'}>
              <MenuButton>
                <img src="/header/cart.svg" width="42" height="42" alt="cart" />
              </MenuButton>
            </Link>
            <MenuButton onClick={openModalHandler}>
              <img
                src="/header/mypage.svg"
                width="42"
                height="42"
                alt="mypage"
              />
            </MenuButton>
          </>
        ) : null}
      </Menu>
      {isModalOpen && <ModalBackdrop onClick={openModalHandler} />}
      {isModalOpen ? (
        <ModalBox onClick={(event) => event.stopPropagation()}>
          <ModalMenu onClick={handleClickModalMenu}>마이 페이지</ModalMenu>{' '}
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
  width: 100vw;
  max-width: 2400px;
  height: 140px;
  color: ${({ theme }) => theme.color.white};
  padding: 0 60px;
  z-index: '10';
  position: relative;
  background-color: ${({ theme }) => theme.color.blue};

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
  padding: 20px 0;
  font-size: 40px;
  font-weight: 700;
`;

const Menu = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    height: 100%;
  }
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
  background-color: ${({ theme }) => theme.color.white};

  width: 180px;
  height: 90px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.blue};

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 110px;
  right: 20px;
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
  font-weight: 600;
  color: ${({ theme }) => theme.color.blue};
`;

const Search = styled(TextField)`
  border: 4px solid ${({ theme }) => theme.color.blue};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  width: 450px;
`;
