import React, { ReactHTMLElement, useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { MdEdit } from 'react-icons/md';

// 전역 상태들이 작성되어 있는 store 목록에서 전역 상태를 불러옴
import { dateState, totalBudgetState } from '../../util/store';

const MonthlyBudget = () => {
  const [date] = useRecoilState<Date>(dateState);
  const [totalBudget, setTotalBudget] =
    useRecoilState<number>(totalBudgetState);

  const [isEditable, setIsEditable] = useState(false);

  const handleEditable = () => {
    setIsEditable(!isEditable);
  };
  // 어떤 타입으로 지정해야 할지 생각해보기
  const handleTotalBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalBudget(Number(event.target.value));
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      fontFamily="GmarketSansMedium"
      w="400px"
    >
      {/* getMonth()는 1월이 0 값이므로, +1을 해줘야 함 */}
      <Text fontSize="0.8rem">{`${date.getMonth() + 1}월 예산`}</Text>
      <Box display="flex">
        {isEditable ? (
          <InputGroup>
            <Input
              type="number"
              value={totalBudget}
              onChange={handleTotalBudget}
            ></Input>
            <InputRightElement>
              <Button onClick={handleEditable}>저장</Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <>
            <Text as="b" fontSize="1.5rem">{`${new Intl.NumberFormat().format(
              totalBudget
            )}원`}</Text>
            <Box
              display="flex"
              alignItems="center"
              ml={1}
              onClick={handleEditable}
            >
              <MdEdit color="grey" width={2} />
            </Box>
          </>
        )}
      </Box>
      <Box
        fontSize="0.8rem"
        display="flex"
        justifyContent="space-between"
        w="100%"
      >
        <Text>지난 달 지출</Text>
        <Text>{`${new Intl.NumberFormat().format(totalBudget)}원`}</Text>
      </Box>
    </Box>
  );
};

export default MonthlyBudget;
