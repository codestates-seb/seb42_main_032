// import modules
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { useState } from 'react';

interface categoryBudget {
  categoryId: number;
}
const CategoryBudget = () => {
  const [budget, setBudget] = useState<number>(0);

  const handleBudget = (e: any) => {
    setBudget(e.target.value);
  };
  return (
    <Box>
      {/* Icon Container */}
      <Box>
        <MdShoppingCart />
      </Box>
      {/* Input per category Container */}
      <Box>
        {/* Category Label Container */}
        <Box display="flex" flexDir="column">
          <Text>카테고리명</Text>
          <Text>지난달 0원</Text>
        </Box>
        {/* Input Container */}
        <InputGroup>
          <Input type="number" value={budget} onChange={handleBudget}></Input>
          <InputRightAddon children="원" />
        </InputGroup>
      </Box>
    </Box>
  );
};

export default CategoryBudget;
