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
import { GiReceiveMoney, GiExpense } from 'react-icons/gi';
const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }
`;

function UserInput({ label, setState, state }) {
  const handleState = (e: any) => {
    setState(e.target.value);
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
                ) : label === '급여일' ? (
                  <Icon as={GiReceiveMoney} color="gray.700" />
                ) : (
                  <Icon as={GiExpense} color="gray.700" />
                )
              }
            />
            <Input type="date" size="md" focusBorderColor="purple.400"></Input>
          </InputGroup>
          <InputGroup className="input-initialbudget" size="md" ml="20vw">
            <InputLeftElement
              pointerEvents="none"
              children={
                label === '예산 시작일' ? (
                  <Icon as={TbPigMoney} color="gray.700" />
                ) : label === '급여일' ? (
                  <Icon as={GiReceiveMoney} color="gray.700" />
                ) : (
                  <Icon as={GiExpense} color="gray.700" />
                )
              }
            />
            <Input
              type="number"
              focusBorderColor="purple.400"
              // TODO 핸들러 함수 작성
              onKeyUp={(e) => handleState(e)}
              // TODO 상태 받아와서 작성
              value={state}
            ></Input>
            <InputRightAddon children="원" />
          </InputGroup>
        </Box>
      </Box>
    </SetContainer>
  );
}

export default UserInput;
