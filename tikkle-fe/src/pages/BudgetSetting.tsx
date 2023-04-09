import { Box, Text, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState, lazy } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import BudgetDropdown from '../components/budget_setting/BudgetDropdown';
const CategoryBudget = lazy(
  () => import('../components/budget_setting/CategoryBudget')
);
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';
import Loading from '../components/layout/Loading';
import { useHrefModal } from '../hooks/useHrefModal';
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

export interface CategoryType {
  id: number;
  name: string;
  categoryIcon: string;
  memberId: number;
  categoryId: number;
}

const BudgetSetting = () => {
  // PC 화면에 대응하기 위해 추가
  const [isLagerThan900px] = useMediaQuery('(min-width: 900px)');

  const userInfo = useRecoilValue(userInfoState);

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>();
  const [budgets, setBudgets] = useState<BudgetType[]>();

  const modal = useHrefModal(
    '튜토리얼을 마쳤습니다. 자유롭게 Tikkle을 사용해주세요.',
    '홈으로 이동',
    'home'
  );

  const getCategories = async () => {
    // 컴포넌트 상태를 로딩 중으로 업데이트한 후 카테고리 데이터 요청
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/categories/${userInfo?.id}`
      );
      console.log(res.data);
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
      let res = (
        await axios.get(
          `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo?.id}`
        )
      ).data;

      // 예산 금액을 기준으로 내림차순 정렬
      res.sort((a: BudgetType, b: BudgetType) => {
        return b.amount - a.amount;
      });

      console.log(res);

      setBudgets(res);
    } catch (err) {
      console.log(err);
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
              {`전체 예산 ${new Intl.NumberFormat('ko-KR').format(
                userInfo?.totalBudget || 0
              )}원`}
            </Text>
            <Box display="flex" justifyContent="space-between" my="20px">
              {/* 드롭다운 메뉴 선택 시 드롭다운 기준 부모인 지금 컴포넌트를 다시 렌더링해야 함 */}
              {/* 이를 위해 GET 요청 함수를 props로 내려줌 */}
              <BudgetDropdown
                totalAmount={userInfo?.totalBudget || 0}
                getBudgets={getBudgets}
              />
              <button onClick={modal.onOpen}>저장하기</button>
            </Box>
          </Box>
          <Box display="flex" flexDir="column" w="100%" gap="40px" mb="40px">
            {isLoading ? (
              <Loading />
            ) : (
              budgets?.map((budget) => {
                return (
                  <CategoryBudget
                    key={budget.id}
                    budgetId={budget.id}
                    categoryId={budget.memberCategoryId}
                  />
                );
              })
            )}
          </Box>
        </Box>
      </Box>
      <modal.ModalWrapper />
    </Box>
  );
};

export default BudgetSetting;
