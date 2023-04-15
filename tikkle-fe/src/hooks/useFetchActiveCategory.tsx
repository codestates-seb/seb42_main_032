import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';

// 활성화 된 카테고리만 조회하는 훅
// 예산 정보는 활성화된 카테고리만 조회되므로, 예산을 불러오고, 불러온 예산정보와 일치하는 카테고리만 뽑음
const useFetchActiveCategory = async () => {
  const userInfo = useRecoilValue(userInfoState);
  try {
    const memberBudget = await (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo?.id}`
      )
    ).data;

    const allCategories = await axios.get(
      `${import.meta.env.VITE_SERVER}/categories/${userInfo?.id}`
    );
    const activeCategory = [];
    for (const i of memberBudget) {
      for (const j of allCategories?.data.data) {
        if (i.memberCategoryId === j.id && i.status === 'ACTIVE') {
          activeCategory.push({ ...j, ...i });
          break;
        }
      }
    }
    return activeCategory;
  } catch (err) {
    return err;
  }
};

export default useFetchActiveCategory;
