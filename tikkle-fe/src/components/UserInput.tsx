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
import { Dispatch, SetStateAction } from 'react';

const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }
  .valid {
    color: #4949ff;
    font-size: medium;
  }

  .invalid {
    color: #f84c4c;
    font-size: medium;
  }
`;

//TODO props 타입 지정
function UserInput({
  label,
  initDateMessage,
  setInitDateMessage,
  isInitDateValid,
  setIsinitDateValid,
  totalBudgetMessage,
  setTotalBudgetMessage,
  isTotalBudgetValid,
  setIsTotalBudgetValid,
  payDayMessage,
  setPayDayMessage,
  isPayDayValid,
  setIsPayDayValid,
  payAmountMessage,
  setPayAmountMessage,
  isPayAmountValid,
  setIsPayAmountValid,
}: {
  label: string;
  initDateMessage: string;
  setInitDateMessage: Dispatch<SetStateAction<string>>;
  isInitDateValid: boolean;
  setIsinitDateValid: Dispatch<SetStateAction<boolean>>;
  totalBudgetMessage: string;
  setTotalBudgetMessage: Dispatch<SetStateAction<string>>;
  isTotalBudgetValid: boolean;
  setIsTotalBudgetValid: Dispatch<SetStateAction<boolean>>;
  payDayMessage: string;
  setPayDayMessage: Dispatch<SetStateAction<string>>;
  isPayDayValid: boolean;
  setIsPayDayValid: Dispatch<SetStateAction<boolean>>;
  payAmountMessage: string;
  setPayAmountMessage: Dispatch<SetStateAction<string>>;
  isPayAmountValid: boolean;
  setIsPayAmountValid: Dispatch<SetStateAction<boolean>>;
}) {
  // userInfo Recoil atom으로 가져오기
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 예산 시작일 수정 및 유효성 검사
  const handleInitDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const initDate = Number(e.target.value);
    setUserInfo({ ...userInfo, initDate });
    if (initDate <= 28 && initDate >= 1) {
      setIsinitDateValid(true);
      setInitDateMessage('올바른 날짜 형식입니다.');
    } else {
      setIsinitDateValid(false);
      setInitDateMessage('1일 ~ 28일 사이의 숫자를 입력해주세요.');
    }
  };
  // 예산 수정 및 유효성 검사
  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const totalBudget = Number(e.target.value);
    setUserInfo({ ...userInfo, totalBudget });
    if (totalBudget > 0) {
      setIsTotalBudgetValid(true);
      setTotalBudgetMessage('올바른 금액 형식입니다.');
    } else {
      setIsTotalBudgetValid(false);
      setTotalBudgetMessage('올바른 숫자를 입력해주세요.');
    }
  };
  // 급여일 수정 및 유효성 검사
  const handlePayDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payDay = Number(e.target.value);
    setUserInfo({ ...userInfo, payDay });
    if (payDay <= 28 && payDay >= 1) {
      setIsPayDayValid(true);
      setPayDayMessage('올바른 날짜 형식입니다.');
    } else {
      setIsPayDayValid(false);
      setPayDayMessage('1일 ~ 28일 사이의 숫자를 입력해주세요.');
    }
  };
  // 급여 금액 수정 및 유효성 검사
  const handlePayAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payAmount = Number(e.target.value);
    setUserInfo({ ...userInfo, payAmount });
    if (payAmount > 0) {
      setIsPayAmountValid(true);
      setPayAmountMessage('올바른 금액 형식입니다.');
    } else {
      setIsPayAmountValid(false);
      setPayAmountMessage('올바른 숫자를 입력해주세요.');
    }
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

            <p
              className={
                label === '예산 시작일'
                  ? isInitDateValid
                    ? 'valid'
                    : 'invalid'
                  : isPayDayValid
                  ? 'valid'
                  : 'invalid'
              }
            >
              {label === '예산 시작일' ? initDateMessage : payDayMessage}
            </p>
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
          <p
            className={
              label === '예산 시작일'
                ? isTotalBudgetValid
                  ? 'valid'
                  : 'invalid'
                : isPayAmountValid
                ? 'valid'
                : 'invalid'
            }
          >
            {label === '예산 시작일' ? totalBudgetMessage : payAmountMessage}
          </p>
        </Box>
      </Box>
    </SetContainer>
  );
}

export default UserInput;
