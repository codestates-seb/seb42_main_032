import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const DropdownContainer = styled.div`
  font-family: 'GmarketSansMedium';
`;
const Dropdown = styled.span`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
`;

const BudgetDropdown = () => {
  const [consumptionType, setConsumptionType] =
    useState('소비유형을 선택하세요.');

  const handleDropdown = (e: any) => {
    setConsumptionType(e.target.innerHTML);
  };
  return (
    <DropdownContainer>
      <Menu>
        <MenuButton as={Dropdown}>
          {consumptionType}
          <ChevronDownIcon boxSize={25} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDropdown}>식비 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>쇼핑 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>술/유흥 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>뷰티/미용 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>여행 위주</MenuItem>
        </MenuList>
      </Menu>
    </DropdownContainer>
  );
};

export default BudgetDropdown;
