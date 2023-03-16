//TODO SIGNUP_002 유저 정보 입력 페이지 구현 (사용자 이름, 예산 시작일, 급여일, 고정 지출 등)
import { useState } from 'react';

import UserInput from '../components/UserInput';

import styled from 'styled-components';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import { Icon, AddIcon } from '@chakra-ui/icons';
import { BsFillPersonFill } from 'react-icons/bs';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney, GiExpense } from 'react-icons/gi';

const Container = styled.div`
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  .title-container {
    text-align: left;
    margin-top: 10vh;
    margin-bottom: 10vh;
    background-color: #faf5ff;
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
  // username
  const [username, setUsername] = useState('');
  // initial budget
  const [ibDate, setIbDate] = useState();
  const [ibAmount, setIbAmount] = useState();
  // salary
  const [salaryDate, setSalaryDate] = useState();
  const [salaryAmount, setSalaryAmount] = useState();
  // fixed expenses
  const [feDate, setFeDate] = useState();
  const [feAmount, setFeAmount] = useState();

  const handleUserInput = (e: any) => {
    setUsername(e.target.value);
  };

  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 정보 설정</span>
      </div>
      <SetContainer>
        <Box display="flex" flexDir="column" ml="10vw">
          <Box display="flex" mb="1vh">
            <p>사용자 이름</p>
          </Box>
          <InputGroup className="input-username">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={BsFillPersonFill} color="gray.700" />}
            />
            <Input
              type="text"
              size="md"
              focusBorderColor="purple.400"
              onKeyUp={(e) => {
                handleUserInput(e);
              }}
            ></Input>
            {/* <InputRightElement children={<CheckIcon color="gray.700" />} /> */}
          </InputGroup>

          <Button
            colorScheme="purple"
            size="md"
            variant="outline"
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
      />
      <UserInput
        label={'급여일'}
        setState={setSalaryAmount}
        state={salaryAmount}
      />
      <UserInput label={'고정 지출'} setState={setFeAmount} state={feAmount} />
    </Container>
  );
}

export default UserSetting;
