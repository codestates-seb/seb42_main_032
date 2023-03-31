import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import CategoryIcon from '../category/CategoryIcon';

const CategoryBudget = ({
  budgetId,
  categoryLabel,
  categoryIcon,
}: {
  budgetId: number;
  categoryLabel: string;
  categoryIcon: string;
}) => {
  const [budgetAmount, setBudgetAmount] = useState(0);

  const getBudgetAmount = async () => {
    try {
      const res =
        (await axios.get(`http://localhost:3000/budgets/${budgetId}`)).data
          .amount || 0;
      setBudgetAmount(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBudgetAmount();
  }, []);
  useEffect(() => {
    axios.patch(`http://localhost:3000/budgets/${budgetId}`, {
      amount: budgetAmount,
    });
  }, [budgetAmount]);

  return (
    <Box
      fontFamily="GmarketSansMedium"
      w="100%"
      minW="450px"
      maxW="700px"
      display="flex"
      flexDir="column"
    >
      <Box display="flex" w="100%">
        {/* Icon Container */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="15%"
          fontSize="2em"
        >
          {/* 카테고리 아이콘 컴포넌트 불러와서 표시 */}
          <CategoryIcon icon={categoryIcon} />
        </Box>
        {/* Input per category Container */}
        <Box display="flex" justifyContent="space-between" w="85%">
          {/* Category Label Container */}
          <Box display="flex" flexDir="column" alignItems="flex-start" w="40%">
            <Text>{categoryLabel}</Text>
            <Text fontSize="0.8rem" color="grey">
              지난달 0원
            </Text>
          </Box>
          {/* Input Container */}
          <InputGroup w="50%">
            <Input
              type="number"
              value={budgetAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBudgetAmount(Number(e.target.value));
              }}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  console.log(e);
                  (e.target as HTMLInputElement).blur();
                }
              }}
            ></Input>
            <InputRightAddon fontSize="0.8rem" children="원" />
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryBudget;
