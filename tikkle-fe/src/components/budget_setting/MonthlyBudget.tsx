import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { MdEdit } from 'react-icons/md';

// 전역 상태들이 작성되어 있는 store 목록에서 전역 상태를 불러옴
import { dateState, totalBudgetState } from '../../util/store';

const MonthlyBudget = () => {
  const [date, setDate] = useRecoilState<Date>(dateState);
  const [totalBudget, setTotalBudget] =
    useRecoilState<number>(totalBudgetState);

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      fontFamily="GmarketSansMedium"
    >
      {/* getMonth()는 1월이 0 값이므로, +1을 해줘야 함 */}
      <Text fontSize="0.8rem">{`${date.getMonth() + 1}월 예산`}</Text>
      <Box display="flex">
        <Text as="b" fontSize="1.5rem">{`${new Intl.NumberFormat().format(
          totalBudget
        )}원`}</Text>
        <Box display="flex" alignItems="center" ml={1}>
          <MdEdit color="grey" width={2} />
        </Box>
      </Box>
      <Box fontSize="0.8rem" display="flex" gap="8rem">
        <Text>지난 달 지출</Text>
        <Text>{`${new Intl.NumberFormat().format(totalBudget)}원`}</Text>
      </Box>
    </Box>
  );
};

export default MonthlyBudget;
