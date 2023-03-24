import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { useState } from 'react';

const CategoryBudget = () => {
  // ToDo 네트워크에 연결된 데이터를 수정하도록 변경
  const [budget, setBudget] = useState(0);
  const [label] = useState('카테고리명');

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
          <MdShoppingCart />
        </Box>
        {/* Input per category Container */}
        <Box display="flex" justifyContent="space-between" w="85%">
          {/* Category Label Container */}
          <Box display="flex" flexDir="column" alignItems="flex-start" w="40%">
            <Text>{label}</Text>
            <Text fontSize="0.8rem" color="grey">
              지난달 0원
            </Text>
          </Box>
          {/* Input Container */}
          <InputGroup w="50%">
            <Input
              type="number"
              value={budget}
              onChange={(e: any) => setBudget(e.target.value)}
            ></Input>
            <InputRightAddon fontSize="0.8rem" children="원" />
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryBudget;
