import axios from 'axios';

const useFetchActiveCategory = async (id: number) => {
  const memberBudget = await (
    await axios.get(`${import.meta.env.VITE_SERVER}/budgets/members/${id}`)
  ).data;

  const allCategories = await axios.get(
    `${import.meta.env.VITE_SERVER}/categories/${id}`
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
};

export default useFetchActiveCategory;
