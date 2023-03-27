//TODO SIGNUP_002 유저 정보 입력 페이지 구현 (사용자 이름, 예산 시작일, 급여일, 고정 지출 등)
import { useEffect, useState } from 'react';

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
import { useRecoilValue } from 'recoil';
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
// TODO 체크 아이콘 조건부 색상 변경 (green)
// TODO 금액 입력 시 콤마 찍혀서 input에 출력
function UserSetting() {
  const navigate = useNavigate();
  // username
  const [username, setUsername] = useState('');
  //user gender
  const [userGender, setUserGender] = useState('');
  // initial budget
  const [ibDate, setIbDate] = useState(new Date().toISOString());
  const [ibAmount, setIbAmount] = useState(0);
  // salary
  const [salaryDate, setSalaryDate] = useState(new Date().toISOString());
  const [salaryAmount, setSalaryAmount] = useState(0);

  // axios GET, PATCH 요청 parameter에 넣을 member_id
  const memberId = useRecoilValue(userInfoState)?.id;

  // userInfo 가져오기
  useEffect(() => {
    const getUserSetting = async () => {
      await axios
        .get(`${import.meta.env.VITE_SERVER}/members/${memberId}`)
        .then((res) => {
          setUsername(res.data.data.name);
        });
    };
    getUserSetting();
  }, []);
  // 기존 입력된 정보와서 input에 보여주기

  // TODO axios POST 요청으로 입력된 정보 전송
  const handleUserInput = (e: any) => {
    setUsername(e.target.value);
  };

  const handleUserGender = (e: any) => {
    setUserGender(e.target.value);
  };

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
              value={username}
              type="text"
              size="md"
              focusBorderColor="purple.400"
              onChange={(e) => {
                handleUserInput(e);
              }}
              placeholder="ex) 홍길동"
            ></Input>
            {/* <InputRightElement children={<CheckIcon color="gray.700" />} /> */}
            <Select
              focusBorderColor="purple.400"
              onClick={(e) => handleUserGender(e)}
              className="select-usergender"
              placeholder="성별을 선택하세요"
              ml="1em"
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
      <UserInput
        label={'예산 시작일'}
        setState={setIbAmount}
        state={ibAmount}
        setDate={setIbDate}
        date={ibDate}
      />
      <UserInput
        label={'급여일'}
        setState={setSalaryAmount}
        state={salaryAmount}
        setDate={setSalaryDate}
        date={salaryDate}
      />
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
