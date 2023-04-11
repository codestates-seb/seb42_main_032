import styled from 'styled-components';
import axios from 'axios';
import { Box, Button, Icon } from '@chakra-ui/react';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: bold;
  .title-container {
    text-align: left;
    margin-top: 10vh;
    margin-bottom: 10vh;
    background-color: #dec8f5;
  }
  .usersetting-title {
    margin-left: 5vh;
    text-align: left;
    font-weight: bold;
    font-size: 2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  margin-left: 6em;
  margin-bottom: 2em;
  font-size: larger;
`;
const EmailContainer = styled.div`
  display: flex;
  margin-left: 6em;
  margin-bottom: 2em;
  font-size: larger;
`;
const IDContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6em;
  margin-bottom: 2em;
  font-size: larger;
  .notice {
    color: #9240e9;
    font-size: medium;
  }
  p {
    display: flex;
    margin-bottom: 1em;
  }
  }
`;
const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6em;
  margin-bottom: 2em;
  font-size: larger;
  p {
    display: flex;
    margin-bottom: 1em;
  }
`;
function UserInfo() {
  // userInfo Recoil atom으로 가져오기
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();
  // 수정하기 버튼 클릭 시, usersetting 페이지로 이동
  const handleClick = () => {
    navigate('/usersetting');
  };

  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 정보</span>
      </div>
      <InfoContainer>
        <NameContainer>
          <p>회원 이름: {userInfo?.name}</p>
        </NameContainer>
        <EmailContainer>
          <p>이메일: {userInfo?.email}</p>
        </EmailContainer>
        <IDContainer>
          <p>예산 시작일: 매 달 {userInfo?.initDate}일</p>
          <p>
            한 달 예산: 총{' '}
            {new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            }).format(Number(userInfo?.totalBudget))}
          </p>
          <p className="notice">
            한 달 예산은 매 달 예산 시작일 오전 04시에 초기화됩니다.
          </p>
        </IDContainer>
        <PayContainer>
          <p>급여일: 매달 {userInfo?.payDay}일</p>
          <p>
            급여:{' '}
            {new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            }).format(Number(userInfo?.payAmount))}
            원
          </p>
        </PayContainer>
      </InfoContainer>
      <Box className="box-container">
        <Button
          colorScheme="purple"
          size="md"
          mb="5em"
          mt="5em"
          onClick={handleClick}
        >
          수정하기
        </Button>
      </Box>
    </Container>
  );
}

export default UserInfo;
