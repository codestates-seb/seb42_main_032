import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import CategoryBudget from '../components/budget_setting/CategoryBudget';
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';

const BudgetSetting = () => {
  const [categoryList, setCategoryList] = useState([{}]);

  const addCategory = () => {
    setCategoryList([...categoryList, {}]);
  };
  const deleteCategory = () => {
    setCategoryList(categoryList.slice(0, categoryList.length - 1));
  };

  return (
    <>
      <MonthlyBudget />
      <Box h="5rem">
        <Button onClick={addCategory}>+</Button>
      </Box>
      {categoryList.map(() => (
        <CategoryBudget handleDelete={deleteCategory} />
      ))}
    </>
  );
};

export default BudgetSetting;
