import { Box, Button, Text, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import CategoryBudget from '../components/budget_setting/CategoryBudget';
import MonthlyBudget from '../components/budget_setting/MonthlyBudget';

const BudgetSetting = () => {
  const [isLagerThan900px] = useMediaQuery('(min-width: 900px)');

  const [categoryList, setCategoryList] = useState([{}]);

  const addCategory = () => {
    setCategoryList([...categoryList, {}]);
  };
  const deleteCategory = () => {
    setCategoryList(categoryList.slice(0, categoryList.length - 1));
  };

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
            <Button onClick={addCategory}>+</Button>
          </Box>
          <Box display="flex" flexDir="column" w="100%" gap="40px">
            {categoryList.map(() => (
              <CategoryBudget handleDelete={deleteCategory} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetSetting;
