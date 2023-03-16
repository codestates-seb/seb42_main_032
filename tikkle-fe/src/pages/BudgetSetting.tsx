import { Box } from '@chakra-ui/react';
import CategoryBudget from '../components/budget_setting/CategoryBudget';
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';

const BudgetSetting = () => {
  return (
    <>
      <MonthlyBudget />
      <Box h="5rem" />
      <CategoryBudget />
    </>
  );
};

export default BudgetSetting;
