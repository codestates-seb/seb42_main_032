// import modules
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
  Button,
} from '@chakra-ui/react';
import { MdShoppingCart, MdEdit } from 'react-icons/md';
import { useState } from 'react';

// ToDo 추후 post, patch 요청 시 ID 값 활용
interface categoryBudget {
  categoryId?: number;
  handleDelete: () => void;
}
const CategoryBudget = (props: categoryBudget) => {
  // ToDo 네트워크에 연결된 데이터를 수정하도록 변경
  const [budget, setBudget] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [label, setLabel] = useState('카테고리명');

  const handleBudget = (e: any) => {
    setBudget(e.target.value);
  };
  const handleLabel = (e: any) => {
    setLabel(e.target.value);
  };
  const handleEditable = (e: any) => {
    setIsEditable(!isEditable);
  };

  return (
    <Box fontFamily="GmarketSansMedium" w="60%" display="flex" flexDir="column">
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
            {isEditable ? (
              <InputGroup>
                <Input type="text" value={label} onChange={handleLabel}></Input>
                <InputRightElement>
                  <Button onClick={handleEditable}>저장</Button>
                </InputRightElement>
              </InputGroup>
            ) : (
              <Box display="flex">
                <Text>{label}</Text>
                <Box
                  display="flex"
                  alignItems="center"
                  ml={1}
                  onClick={handleEditable}
                >
                  <MdEdit color="grey" width={2} />
                </Box>
              </Box>
            )}
            <Text fontSize="0.8rem" color="grey">
              지난달 0원
            </Text>
          </Box>
          {/* Input Container */}
          <InputGroup w="50%">
            <Input type="number" value={budget} onChange={handleBudget}></Input>
            <InputRightAddon fontSize="0.8rem" children="원" />
          </InputGroup>
        </Box>
      </Box>
      <Button onClick={props.handleDelete}>삭제</Button>
    </Box>
  );
};

export default CategoryBudget;
