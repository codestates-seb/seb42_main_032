import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import BudgetDropdown from '../components/budget_setting/BudgetDropdown';
import CategoryBudget from '../components/budget_setting/CategoryBudget';
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';
import { userInfoState } from '../util/store';

export interface BudgetType {
  id: number;
  memberCategoryId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  spend: number;
  createdAt: Date;
}

const BudgetSetting = () => {
  // PC 화면에 대응하기 위해 추가
  const [isLagerThan900px] = useMediaQuery('(min-width: 900px)');

  const [userInfo] = useRecoilState(userInfoState);

  // ToDo 네트워크 요청으로 저장
  // const categoryList =

  const [budgets, setBudgets] = useState<BudgetType[]>();
  console.log(budgets);

  useEffect(() => {
    const getBudgets = async () => {
      // 전체 예산 정보 조회
      // let fetchedBudgets = await axios.get(
      //   `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo?.id}`
      // );
      //

      // 전체 예산 정보 조회 - 테스트용
      let fetchedBudgets = (await axios.get(`http://localhost:8080/budgets`))
        .data;

      // 전체 예산 정보에서 날짜 형식 데이터를 모두 Date 타입으로 형변환
      fetchedBudgets = fetchedBudgets.map((budget: BudgetType) => {
        return {
          ...budget,
          startDate: new Date(budget.startDate),
          endDate: new Date(budget.endDate),
          createdAt: new Date(budget.createdAt),
        };
      });

      // 예산 금액을 기준으로 내림차순 정렬
      fetchedBudgets.sort((a: BudgetType, b: BudgetType) => {
        return b.amount - a.amount;
      });

      setBudgets(fetchedBudgets);
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
            {/* ToDo 카테고리 리스트가 있을 때만 표시하도록 구현 */}
            {/* 서버 컴포넌트 개념 참고 */}
            {/* {categoryList.map(() => (
              // <CategoryBudget budget={} />
            ))} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetSetting;
