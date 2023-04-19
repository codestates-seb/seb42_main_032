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
  status?: string;
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
  const [budgets, setBudgets] = useState<BudgetType[]>();
  const [sumBudgets, setSumBudgets] = useState(0);

  const modal = useHrefModal(
    '튜토리얼을 마쳤습니다. 자유롭게 Tikkle을 사용해주세요.',
    '홈으로 이동',
    'home'
  );

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

      // 활성화된 예산만 불러옴
      res = res.filter((budget: BudgetType) => budget.status === 'ACTIVE');

      setBudgets(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  const handleBudgetSave = () => {
    budgets?.forEach((budget: BudgetType) => {
      axios.patch(`${import.meta.env.VITE_SERVER}/budgets/${budget.id}`, budget);
    })
    alert('저장했습니다.');
  }

  // CategoryBudget에서 예산 금액 수정 시 수정된 금액을 전체 객체에 반영하는 핸들러
  const handleBudgetAmount = (id: number, amount: number) => {
    try {
      const newBudgets = budgets?.map((budget: BudgetType) => {
        // 예산의 id가 변경하려는 예산고 일치하는 경우만 금액을 업데이트
        if (budget.id === id) {
          budget.amount = amount;
          return budget;
        }
        else return budget;
      });
      setBudgets(newBudgets);
    } catch (err) {
      console.log(err);
    }
  }

  // 예산 항목이 비어있지 않을 때만 예산들의 총합을 구함
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      console.log(budgets?.reduce((sum: number, budget) => (sum += budget.amount), 0));
      setSumBudgets(
        budgets?.reduce((sum: number, budget) => (sum += budget.amount), 0)
      );
    }
  }, [budgets]);

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
              <button onClick={() => {
                // 사용자가 최초 설정 중일 때만 모달 표시
                if (userInfo?.state !== 'ACTIVE') modal.onOpen();
                else handleBudgetSave();
              }}>저장하기</button>
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
                    budget={budget}
                    categoryId={budget.memberCategoryId}
                    handleBudgetAmount={handleBudgetAmount}
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
