import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import CategoryIcon from '../category/CategoryIcon';

const CategoryBudget = ({
  budget,
  categoryLabel,
  categoryIcon,
}: {
  budget: number;
  categoryLabel: string;
  categoryIcon: string;
}) => {
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
            <Input type="number" value={budget}></Input>
            <InputRightAddon fontSize="0.8rem" children="원" />
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryBudget;
