//TODO SIGNUP_002 유저 정보 입력 페이지 구현 (사용자 이름, 예산 시작일, 급여일, 고정 지출 등)
import { useEffect, useState } from 'react';
import { userInfoType } from '../pages/Login';
import UserInput from '../components/UserInput';

import styled from 'styled-components';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import { Icon, AddIcon } from '@chakra-ui/icons';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';
import axios from 'axios';

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

  input {
    width: auto;
    margin-bottom: 8em;
  }
`;

const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }
`;

// TODO 금액 입력 시 콤마 찍혀서 input에 출력
function UserSetting() {
  const navigate = useNavigate();

  // userInfo Recoil atom으로 가져오기
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // axios PATCH 요청 parameter에 넣을 member_id
  const memberId = useRecoilValue(userInfoState)?.id;

  // 회원탈퇴 버튼 클릭 핸들러
  const handleClick = () => {
    navigate('/userout');
  };

  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 정보 설정</span>
      </div>
      <SetContainer>
        <Box display="flex" flexDir="column" ml="10vw">
          <Box display="flex" mb="1vh">
            <p>사용자 정보</p>
          </Box>
          <InputGroup className="input-username">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={BsFillPersonFill} color="gray.700" />}
            />
            <Input
              defaultValue={userInfo?.name}
              type="text"
              size="md"
              focusBorderColor="purple.400"
              placeholder="ex) 홍길동"
            ></Input>

            <Select
              focusBorderColor="purple.400"
              className="select-usergender"
              placeholder="성별을 선택하세요"
              ml="1em"
              defaultValue={userInfo?.gender}
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </Select>
          </InputGroup>

          <Button
            colorScheme="purple"
            size="md"
            leftIcon={<AddIcon />}
            loadingText="연결 중"
          >
            계좌 연결하기
          </Button>
        </Box>
      </SetContainer>
      <UserInput label={'예산 시작일'} userInfo={userInfo} />
      <UserInput label={'급여일'} userInfo={userInfo} />
      <Box mb="100px">
        <Button colorScheme="red" size="md" onClick={handleClick}>
          회원 탈퇴하기
        </Button>
        <Button colorScheme="purple" size="md" ml="40px">
          저장하기
        </Button>
      </Box>
    </Container>
  );
}

export default UserSetting;
