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
import { useRecoilState } from 'recoil';
import { userInfoState } from '../util/store';

const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }
`;

//TODO props 타입 지정
function UserInput({ label }: { label: string }) {
  // userInfo Recoil atom으로 가져오기
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 예산 시작일 수정
  const handleInitDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initDate = Number(e.target.value);
    setUserInfo({ ...userInfo, initDate });
  };
  // 예산 수정
  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const totalBudget = Number(e.target.value);
    setUserInfo({ ...userInfo, totalBudget });
  };
  // 급여일 수정
  const handlePayDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payDay = Number(e.target.value);
    setUserInfo({ ...userInfo, payDay });
  };
  // 급여 금액 수정
  const handlePayAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payAmount = Number(e.target.value);
    setUserInfo({ ...userInfo, payAmount });
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
              type="number"
              size="md"
              focusBorderColor="purple.400"
              placeholder={
                label === '예산 시작일'
                  ? 'ex) 13 (매월 13일)'
                  : 'ex) 25 (매월 25일)'
              }
              defaultValue={
                label === '예산 시작일' ? userInfo?.initDate : userInfo?.payDay
              }
              onChange={
                label === '예산 시작일'
                  ? handleInitDateChange
                  : handlePayDayChange
              }
            ></Input>
            <InputRightAddon children="일" />
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
              placeholder={
                label === '예산 시작일'
                  ? '예산 전체 금액을 입력하세요.'
                  : '급여 금액을 입력하세요.'
              }
              defaultValue={
                label === '예산 시작일'
                  ? userInfo?.totalBudget
                  : userInfo?.payAmount
              }
              onChange={
                label === '예산 시작일'
                  ? handleTotalBudgetChange
                  : handlePayAmountChange
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
