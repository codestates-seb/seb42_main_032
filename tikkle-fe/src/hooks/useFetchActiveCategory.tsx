import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { BudgetType, CategoryType } from '../pages/BudgetSetting';
import { userInfoState } from '../util/store';

// 활성화 된 카테고리만 조회하는 훅
// 예산 정보는 활성화된 카테고리만 조회되므로, 예산을 불러오고, 불러온 예산정보와 일치하는 카테고리만 뽑음
const useFetchActiveCategory = async () => {
  const userInfo = useRecoilValue(userInfoState);
  try {
    const memberBudget = (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo?.id}`
      )
    ).data;

    const allCategories = (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/categories/${userInfo?.id}`
      )
    ).data.data;

    // 활성화된 카테고리만 추출
    const activeBudget = memberBudget.filter(
      (budget: BudgetType) => budget.status === 'ACTIVE'
    );

    // 카테고리의 ID가 활성화된 예산의 멤버 카테고리 id로 존재하는 경우만 추출
    const activeCategory = allCategories.filter(
      (category: CategoryType) =>
        category.id ===
        activeBudget.includes((budget: BudgetType) => budget.memberCategoryId)
    );

    return activeCategory;
  } catch (err) {
    console.log(err);
  }
};

export default useFetchActiveCategory;
