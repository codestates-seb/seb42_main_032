import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState, lazy } from 'react';
import { useRecoilState } from 'recoil';

import BudgetDropdown from '../components/budget_setting/BudgetDropdown';
const CategoryBudget = lazy(
  () => import('../components/budget_setting/CategoryBudget')
);
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';
import Loading from '../components/layout/Loading';
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

interface CategoryType {
  id: number;
  name: string;
  categoryIcon: string;
  memberId: number;
  categoryId: number;
}

const BudgetSetting = () => {
  // PC 화면에 대응하기 위해 추가
  const [isLagerThan900px] = useMediaQuery('(min-width: 900px)');

  const [userInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<CategoryType[]>();
  const [budgets, setBudgets] = useState<BudgetType[]>();

  const getCategories = async () => {
    // 컴포넌트 상태를 로딩 중으로 업데이트한 후 카테고리 데이터 요청
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:8080/categories');
      setCategories(res.data);
    } catch (err) {
      // 요청 실패 시 콘솔에 에러 표시
      console.log(err);
    } finally {
      // 네트워크 요청을 완료하면 성공/실패 여부에 관계 없이 로딩이 멈추도록 업데이트
      setIsLoading(false);
    }
  };

  // 네트워크 요청은 getCategories와 같은 방식(주소만 다름)
  const getBudgets = async () => {
    try {
      setIsLoading(true);
      let res = (await axios.get(`http://localhost:8080/budgets`)).data;

      // 전체 예산 정보에서 날짜 형식 데이터를 모두 Date 타입으로 형변환
      res = res.map((budget: BudgetType) => {
        return {
          ...budget,
          startDate: new Date(budget.startDate),
          endDate: new Date(budget.endDate),
          createdAt: new Date(budget.createdAt),
        };
      });

      // 예산 금액을 기준으로 내림차순 정렬
      res.sort((a: BudgetType, b: BudgetType) => {
        return b.amount - a.amount;
      });

      setBudgets(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBudgets();
    getCategories();
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
            {isLoading ? (
              <Loading />
            ) : (
              budgets?.map((budget) => {
                const category = categories?.filter(
                  (category) => budget.memberCategoryId === category.id
                )[0];
                return (
                  <CategoryBudget
                    key={budget.id}
                    budget={budget.amount}
                    categoryIcon={category?.categoryIcon || ''}
                    categoryLabel={category?.name || ''}
                  />
                );
              })
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetSetting;
