import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import BudgetDropdown from '../components/budget_setting/BudgetDropdown';
import CategoryBudget from '../components/budget_setting/CategoryBudget';
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';
import { userInfoState } from '../util/store';

const BudgetSetting = () => {
  // PC 화면에 대응하기 위해 추가
  const [isLagerThan900px] = useMediaQuery('(min-width: 900px)');

  const [userInfo] = useRecoilState(userInfoState);
  console.log(userInfo);

  // ToDo 카테고리 페이지에서 추가된 카테고리를 기준으로 List 생성
  const [categoryList] = useState([{}]);

  useEffect(() => {
    const getBudgets = async () => {
      const fetchedBudgets = await axios.get(
        `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo?.id}`
      );
      console.log(fetchedBudgets);
    };

    getBudgets();
  }, []);

  return (
    <Box
      fontFamily="GmarketSansMedium"
      display="flex"
      justifyContent="center"
      mt="100px"
    >
      <Box
        display="flex"
        flexDir={isLagerThan900px ? 'row' : 'column'}
        justifyContent={isLagerThan900px ? 'center' : ''}
        w="80%"
      >
        <MonthlyBudget />
        <Box
          display="flex"
          flexDir="column"
          w="100%"
          alignItems="center"
          borderLeft={isLagerThan900px ? 'solid 1px grey' : ''}
          ml={isLagerThan900px ? '20px' : '0'}
          pl={isLagerThan900px ? '20px' : '0'}
        >
          <Box
            borderBottom="solid 1px grey"
            pb="20px"
            mb="40px"
            display="flex"
            flexDir="column"
            w="100%"
          >
            <Box display="flex" justifyContent="space-between" w="100%">
              <Text as="b">카테고리별 예산</Text>
              <Text>0원 남음</Text>
            </Box>
            <Text align="right" fontSize="0.8rem" color="grey">
              전체 예산 500,000원
            </Text>
            <Box display="flex" justifyContent="flex-start" my="20px">
              <BudgetDropdown />
            </Box>
          </Box>
          <Box display="flex" flexDir="column" w="100%" gap="40px" mb="40px">
            {categoryList.map(() => (
              <CategoryBudget />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetSetting;
