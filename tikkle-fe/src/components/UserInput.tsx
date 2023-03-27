import styled from 'styled-components';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';

import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import { userInfoType } from '../pages/Login';

const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }
`;

interface UserInputType {
  label: string;
  userInfo: userInfoType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType | null>>;
  setState: React.Dispatch<React.SetStateAction<number>>;
  state: string | number;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: Date | string;
}

function UserInput({
  label,
  userInfo,
  setUserInfo,
  setState,
  state,
  setDate,
  date,
}: UserInputType) {

  // const handleState = (e: any) => {
  //   const newState = e.target.value;
  //   setState(newState);

  //   if (label === '예산 시작일') {
  //     const newUserInfo = {
  //       ...userInfo,
  //       totalBudget: newState,
  //     };
  //     setUserInfo(newUserInfo);
  //   } else if (label === '급여일') {
  //     const newUserInfo = {
  //       ...userInfo,
  //       payAmount: newState,
  //     };
  //     setUserInfo(newUserInfo);
  //   }
  // };

  const handleDate = (e: any) => {
    setDate(new Date(e.target.value).toISOString());
  };

  return (
    <SetContainer>
      <Box display="flex" flexDir="column" ml="10vw">
        <Box display="flex" mb="1vh">
          <p>{label}</p>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <InputGroup className="input-initialbudget">
            <InputLeftElement
              pointerEvents="none"
              children={
                label === '예산 시작일' ? (
                  <Icon as={TbPigMoney} color="gray.700" />
                ) : (
                  <Icon as={GiReceiveMoney} color="gray.700" />
                )
              }
            />
            <Input
              type="date"
              size="md"
              focusBorderColor="purple.400"
              onChange={(e) => handleDate(e)}
            ></Input>
          </InputGroup>
          <InputGroup className="input-initialbudget" size="md" ml="20vw">
            <InputLeftElement
              pointerEvents="none"
              children={
                label === '예산 시작일' ? (
                  <Icon as={TbPigMoney} color="gray.700" />
                ) : (
                  <Icon as={GiReceiveMoney} color="gray.700" />
                )
              }
            />
            <Input
              type="number"
              focusBorderColor="purple.400"
              // onChange={(e) => handleState(e)}
              placeholder={
                label === '예산 시작일'
                  ? '예산 전체 금액을 입력하세요.'
                  : '급여 금액을 입력하세요.'
              }
            ></Input>
            <InputRightAddon children="원" />
          </InputGroup>
        </Box>
      </Box>
    </SetContainer>
  );
}

export default UserInput;
