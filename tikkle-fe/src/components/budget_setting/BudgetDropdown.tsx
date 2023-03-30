import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BudgetType, CategoryType } from '../../pages/BudgetSetting';

const DropdownContainer = styled.div`
  font-family: 'GmarketSansMedium';
`;
const Dropdown = styled.span`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
`;

const BudgetDropdown = ({ totalAmount }: { totalAmount: number }) => {
  const [consumptionType, setConsumptionType] =
    useState('소비유형을 선택하세요.');

  // 예산 설정 페이지에서 보이는 예산을 상태로 선언
  const [totalAmountState, setTotalAmountState] = useState(0);

  const handleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 선택된 값으로 소비유형 값을 갱신하거나, 초기값으로 표시
    setConsumptionType(
      (e.target as HTMLElement).textContent || '소비유형을 선택하세요.'
    );
  };

  // 1. 카테고리 목록을 호출한 이후 선택된 소비유형에 해당하는 카테고리 id를 구함
  // 2. 예산 목록을 호출한 이후 응답에 map 함수를 사용해 예산금액 수정
  // 2-1. 주 카테고리에 해당하는 항목은 규칙에 따라 전체 예산금액의 [70, 60, 50]%를 차지
  // 2-2. 남은 예산 금액을 남은 예산 항목의 수로 나눠 균등 분배
  // 3. 수정된 예산 목록으로 patch
  const updateMainBudgetAmount = async () => {
    try {
      // 카테고리 목록을 호출한 이후 선택된 소비유형에 해당하는 카테고리 id를 구함
      const categories = (await axios.get('http://localhost:8080/categories'))
        .data;
      const selectedCategoryId = categories.filter(
        // consumptionType은 'ㅇㅇ 위주' 형태로 규칙성 있게 소비 유형이 저장되어 있기 때문에, slice 메서드로 앞 2글자만 잘라냄
        (category: CategoryType) =>
          category.name === consumptionType.slice(0, 2)
      )[0].id;

      // 해당 컴포넌트에서 쓰이는 예산 상태를 내려받은 데이터로 갱신
      // => totalAmountState 상태는 아래 로직을 수행하면서 변경되기 때문에,
      // => 소비유형이 갱신됐을 때 원래의 전체 예산 금액에서 다시 계산해야 하므로 useState 초기값에 할당하지 않고, 함수 안에서 할당
      setTotalAmountState(totalAmount);

      // 예산 목록을 호출한 이후 응답에 map 함수를 사용해 예산금액 수정
      let budgets = (await axios.get('http://localhost:8080/budgets')).data;
      budgets = budgets.map((budget: BudgetType) => {
        // budget의 카테고리 타입이 선택된 카테고리인지 판별
        if (budget.memberCategoryId === selectedCategoryId) {
          // 예산 항목이 3개 이하인 경우, 선택된 항목의 예산을 전체 예산의 70%로 설정
          if (budgets.length <= 3) budget.amount = totalAmountState * 0.7;
          // 예산 항목이 3-6개인 경우, 60%
          if (budgets.length <= 6) budget.amount = totalAmountState * 0.6;
          // 예산 항목이 7개 이상인 경우, 50%
          if (budgets.length >= 7) budget.amount = totalAmountState * 0.5;

          // 주 예산 항목에 할당된 금액을 제외한 나머지 금액을 구함
          setTotalAmountState(totalAmount - budget.amount);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ToDo 위에서 작성한 로직 실행하도록 수정
  useEffect(() => {}, [consumptionType]);

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
          <MenuItem onClick={handleDropdown}>유흥 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>뷰티 위주</MenuItem>
          <MenuItem onClick={handleDropdown}>여행 위주</MenuItem>
        </MenuList>
      </Menu>
    </DropdownContainer>
  );
};

export default BudgetDropdown;
