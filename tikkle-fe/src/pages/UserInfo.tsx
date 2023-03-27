import styled from 'styled-components';
import axios from 'axios';
import { Box, Button, Icon } from '@chakra-ui/react';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
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
  font-size: larger;
`;
const EmailContainer = styled.div`
  display: flex;
  margin-left: 6em;
  font-size: larger;
`;
const IDContainer = styled.div`
  display: flex;
  margin-left: 6em;
  font-size: larger;
`;
const PayContainer = styled.div`
  display: flex;
  margin-left: 6em;
  font-size: larger;
`;
function UserInfo() {
  const [userInfo, setUserInfo] = useState();
  // axios GET, PATCH 요청 parameter에 넣을 member_id
  const memberId = useRecoilValue(userInfoState)?.id;

  // userInfo 가져오기
  useEffect(() => {
    const getUserSetting = async () => {
      await axios
        .get(`${import.meta.env.VITE_SERVER}/members/${memberId}`)
        .then((res) => {
          setUserInfo(res.data.data);
        });
    };
    getUserSetting();
  }, []);

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
          <p>회원 이름</p>
          <p>{userInfo?.name}</p>
        </NameContainer>
        <EmailContainer>
          <p>이메일</p>
          <p>{userInfo?.email}</p>
        </EmailContainer>
        <IDContainer>
          <p>예산 시작일</p>
          <p>매달 {userInfo?.initDate}일</p>
          <p>예산</p>
          <p>매달 {userInfo?.totalBudget}원</p>
        </IDContainer>
        <PayContainer>
          <p>급여일</p>
          <p>매달 {userInfo?.payDay}일</p>
          <p>급여</p>
          {/* <p>매달 {userInfo?.totalBudget}원</p> */}
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
