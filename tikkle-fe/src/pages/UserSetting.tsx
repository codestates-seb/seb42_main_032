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

  // initial budget (props로 UserInput에 전달)

  const [ibDate, setIbDate] = useState(new Date().toISOString());
  const [ibAmount, setIbAmount] = useState<number>(userInfo?.totalBudget || 0);
  // salary  (props로 UserInput에 전달)
  const [salaryDate, setSalaryDate] = useState(new Date().toISOString());
  const [salaryAmount, setSalaryAmount] = useState<number>(
    userInfo?.payAmount || 0
  );

  // axios PATCH 요청 parameter에 넣을 member_id
  const memberId = useRecoilValue(userInfoState)?.id;

  // 첫 가입 사용자는 userInfo.payDay 값이 null이므로 첫 사용자 여부를 이걸로 판별
  // 카테고리 생성을 위해서 첫 가입 사용자인 경우 /{member-id}/init에 patch 요청
  if (userInfo?.payDay === null) {
    axios.patch(`${import.meta.env.VITE_SERVER}/members/${memberId}/init`, {
      initDate: 1,
      payDay: 1,
    });
  }

  // TODO axios PATCH 요청으로 입력된 정보 전송

  // name 및 gender 상태변경 핸들러 함수
  // const handleUserInput = (e: any) => {
  //   const newName: string = e.target.value;
  //   const newUserInfo: userInfoType = {
  //     ...userInfo,
  //     name: newName,
  //   };
  //   setUserInfo(newUserInfo);
  // };

  // const handleUserGender = (e: any) => {
  //   const newGender: string = e.taget.value;
  //   const newUserInfo: userInfoType = {
  //     ...userInfo,
  //     gender: newGender,
  //   };
  //   setUserInfo(newUserInfo);
  // };

  // 회원탈퇴 버튼 클릭 핸들러

  const handleClick = () => {
    navigate('/userout');
  };

  // 계좌연결 버튼 핸들러
  const handleConnectOpenbanking = () => {
    window.location.href =
      `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code` +
      `&client_id=${import.meta.env.VITE_K_CLIENT_ID}` +
      `&redirect_uri=${import.meta.env.VITE_CLIENT}/usersetting` +
      `&scope=login inquiry transfer&state=12345678123456781234567812345678&auth_type=0`;
  };

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.search.substring(1));
    const bankingCode = parsedHash.get('code');
    if (bankingCode) {
      axios.post(
        `${
          import.meta.env.VITE_SERVER
        }/members/auth/${memberId}?code=${bankingCode}`
      );
    }
    // 사이트가 첫 렌더링 됐을 때 계좌 인증으로 발행된 code가 있다면 토큰 발급 요청
    if (bankingCode) {
    }
  }, []);

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
              value={userInfo?.name}
              type="text"
              size="md"
              focusBorderColor="purple.400"
              // onChange={(e) => {
              //   handleUserInput(e);
              // }}
              placeholder="ex) 홍길동"
            ></Input>
            {/* <InputRightElement children={<CheckIcon color="gray.700" />} /> */}
            <Select
              focusBorderColor="purple.400"
              // onClick={(e) => handleUserGender(e)}
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
            onClick={handleConnectOpenbanking}
          >
            계좌 연결하기
          </Button>
        </Box>
      </SetContainer>
      <UserInput
        label={'예산 시작일'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setState={setIbAmount}
        state={ibAmount || 0}
        setDate={setIbDate}
        date={ibDate}
      />
      <UserInput
        label={'급여일'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setState={setSalaryAmount}
        state={salaryAmount || 0}
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
