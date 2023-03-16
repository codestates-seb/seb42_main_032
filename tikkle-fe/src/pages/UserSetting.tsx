//TODO SIGNUP_002 유저 정보 입력 페이지 구현 (사용자 이름, 예산 시작일, 급여일, 고정 지출 등)
import { useState } from 'react';

import styled from 'styled-components';
import {
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
  background-color: lightgrey;
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
    margin-bottom: 60px;
    position: relative;
    top: -80px;
    left: 20px;
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

  const handleIbAmount = (e: any) => {
    setIbAmount(e.target.value);
  };

  const handleSalaryAmount = (e: any) => {
    setSalaryAmount(e.target.value);
  };

  const handleFeAmount = (e: any) => {
    setFeAmount(e.target.value);
  };
  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 정보 설정</span>
      </div>
      <SetContainer>
        <div>
          <p>사용자 이름</p>
          <InputGroup className="input-username" ml="10vw">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={BsFillPersonFill} color="gray.400" />}
            />
            <Input
              type="text"
              size="sm"
              focusBorderColor="purple.400"
              onKeyUp={(e) => {
                handleUserInput(e);
              }}
            ></Input>
            {/* <InputRightElement children={<CheckIcon color="gray.300" />} /> */}
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
        </div>
      </SetContainer>
      <SetContainer>
        <div>
          <p>예산 시작일</p>
          <InputGroup className="input-initialbudget" ml="10vw">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={TbPigMoney} color="gray.400" />}
            />
            <Input type="date" size="sm" focusBorderColor="purple.400"></Input>
          </InputGroup>
        </div>
        <InputGroup className="input-initialbudget" size="sm" ml="20vw">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={TbPigMoney} color="gray.400" />}
          />

          <Input
            type="number"
            focusBorderColor="purple.400"
            onKeyUp={(e) => handleIbAmount(e)}
            value={ibAmount}
          ></Input>
          <InputRightAddon children="원" />
        </InputGroup>
      </SetContainer>

      <SetContainer>
        <div>
          <p>급여일</p>
          <InputGroup className="input-salary" ml="10vw">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={GiReceiveMoney} color="gray.400" />}
            />
            <Input type="date" size="sm" focusBorderColor="purple.400"></Input>
          </InputGroup>
        </div>
        <InputGroup className="input-salary" size="sm" ml="20vw">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={GiReceiveMoney} color="gray.400" />}
          />
          <Input
            type="number"
            focusBorderColor="purple.400"
            onKeyUp={(e) => handleSalaryAmount(e)}
          ></Input>
          <InputRightAddon children="원" />
        </InputGroup>
      </SetContainer>
      <SetContainer>
        <div>
          <p>급여일</p>
          <InputGroup className="input-fixedexpenses" ml="10vw">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={GiExpense} color="gray.400" />}
            />
            <Input type="date" size="sm" focusBorderColor="purple.400"></Input>
          </InputGroup>
        </div>
        <InputGroup className="input-fixedexpenses" size="sm" ml="20vw">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={GiExpense} color="gray.400" />}
          />
          <Input
            type="number"
            focusBorderColor="purple.400"
            onKeyUp={(e) => handleFeAmount(e)}
          ></Input>
          <InputRightAddon children="원" />
        </InputGroup>
      </SetContainer>
      <Button colorScheme="purple" size="md" variant="outline">
        저장하기
      </Button>
    </Container>
  );
}

export default UserSetting;
