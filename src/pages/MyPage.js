import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import OrderHistory from 'components/OrderHistory';

export default function MyPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabArr = [
    { name: '내 정보 수정', content: '내 정보!!' },
    {
      name: '주문 내역',
      content: <OrderHistory />,
    },
  ];

  const handleSelectTab = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <PageTitle>
            <TitleText>마이 페이지</TitleText>
          </PageTitle>
          <ContentsContainer>
            <TabMenu>
              {tabArr.map((tab, idx) => (
                <Tab
                  className={currentTab === idx && 'focused'}
                  onClick={() => handleSelectTab(idx)}
                >
                  {tab.name}
                </Tab>
              ))}
            </TabMenu>
            <Content>{tabArr[currentTab].content}</Content>
          </ContentsContainer>
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

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
`;

const TabMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  background-color: #dcdcdc;

  font-size: 24px;
  font-weight: 600;
  list-style: none;
  margin-bottom: 7rem;

  width: 300px;
  transition: 0.4s;

  .focused {
    background-color: black;
    color: white;
    transition: 0.4s; // transition 효과는 쌍방으로
  }

  :hover {
    cursor: pointer;
  }
`;

const Tab = styled.li`
  width: 100%;
  height: 70px;
  line-height: 70px;
  text-align: center;
`;

const Content = styled.div`
  /* border: 4px solid black; */
  width: 800px;
  margin-left: 40px;
`;
