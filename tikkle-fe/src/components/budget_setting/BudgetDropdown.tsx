import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BudgetType, CategoryType } from '../../pages/BudgetSetting';
import { useHrefModal } from '../../hooks/useHrefModal';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../util/store';

const DropdownContainer = styled.div`
  font-family: 'GmarketSansMedium';
`;
const Dropdown = styled.span`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
`;

const BudgetDropdown = ({
  totalAmount,
  getBudgets,
}: {
  totalAmount: number;
  getBudgets: () => Promise<void>;
}) => {
  const [consumptionType, setConsumptionType] =
    useState('소비유형을 선택하세요.');
  const userInfo = useRecoilValue(userInfoState);

  const handleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 선택된 값으로 소비유형 값을 갱신하거나, 초기값으로 표시
    // 또한 textContent의 값이 'ㅇㅇ 위주' 형태로 작성되어 있기 때문에 slice 메서드를 사용하여 잘라냄
    setConsumptionType(
      (e.target as HTMLElement).textContent?.slice(0, 2) ||
        '소비유형을 선택하세요.'
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
      const categories = (
        await axios.get(`${import.meta.env.VITE_SERVER}/categories`)
      ).data;
      const selectedCategoryId = categories.filter(
        (category: CategoryType) => category.name === consumptionType
      )[0].id;

      // 예산 목록을 호출한 이후 응답에 map 함수를 사용해 예산금액 수정
      let budgets = (await axios.get(`${import.meta.env.VITE_SERVER}/budgets`))
        .data;

      // 남은 항목들에게 예산 금액을 균등 분배하기 위한 변수
      let remainAmountEach = 0;

      // 예산 배열 중 선택된 카테고리가 몇번째 요소인지 탐색
      const selectedBudgetIndex = budgets.findIndex(
        (budget: BudgetType) => budget.memberCategoryId === selectedCategoryId
      );

      // 예산 항목이 3개 이하인 경우, 선택된 항목의 예산을 전체 예산의 70%로 설정
      if (budgets.length <= 3)
        budgets[selectedBudgetIndex].amount = totalAmount * 0.7;
      // 예산 항목이 3-6개인 경우, 60%
      else if (budgets.length <= 6)
        budgets[selectedBudgetIndex].amount = totalAmount * 0.6;
      // 예산 항목이 7개 이상인 경우, 50%
      else if (budgets.length >= 7)
        budgets[selectedBudgetIndex].amount = totalAmount * 0.5;

      // 할당하고 남은 금액을 남은 데이터에 균등 분배하려면 얼마씩인지 계산 후 저장
      // 남은 금액을 남은 항목의 개수로 나눠서 구함
      // 남은 항목의 개수는 선택된 카테고리를 제외해야 하므로 length-1
      remainAmountEach =
        (totalAmount - budgets[selectedBudgetIndex].amount) /
        (budgets.length - 1);

      // 남은 항목들의 예산 값을 위에서 구한 값으로 변경
      budgets.map((budget: BudgetType) => {
        // 선택된 카테고리가 아닐 때만 변경
        if (budget.memberCategoryId !== selectedCategoryId) {
          budget.amount = remainAmountEach;
        }
      });

      // 변경된 값으로 PATCH
      // 일괄 PATCH가 없기 때문에 foreach
      budgets.forEach((budget: BudgetType) => {
        axios.patch(`${import.meta.env.VITE_SERVER}/budgets/${budget.id}`, {
          amount: budget.amount,
        });
      });

      // 변경된 값으로 부모 컴포넌트를 다시 렌더링
      getBudgets();
    } catch (err) {
      console.log(err);
    }
  };

  // 선택된 카테고리가 멤버 카테고리에 없을 때 카테고리 설정 페이지로 이동 시키는 모달
  const modal = useHrefModal(
    `${consumptionType} 카테고리가 활성화 되지 않았습니다. 사용하려면 활성화해주세요.`,
    '카테고리 설정으로 이동',
    'categoryedit'
  );

  // 선택된 카테고리가 사용자에게 있는지 검사하는 함수
  const checkHasCategory = async () => {
    try {
      const memberCategories = (
        await axios.get(
          `${import.meta.env.VITE_SERVER}/categories/${userInfo?.id}`
        )
      ).data.data;
      const filteredMemberCategories = memberCategories.filter(
        (category: CategoryType) => consumptionType === category.name
      );
      // 받아온 카테고리 데이터에서 소비 유형 데이터를 검색했을 때 일치하는 이름이 없는 경우
      if (filteredMemberCategories.length === 0) {
        // 위에서 생성한 모달 열기
        modal.onOpen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ToDo 위에서 작성한 로직 실행하도록 수정
  useEffect(() => {
    updateMainBudgetAmount();
    if (consumptionType !== '소비유형을 선택하세요.') checkHasCategory();
  }, [consumptionType]);

  return (
    <DropdownContainer>
      <Menu>
        <MenuButton as={Dropdown}>
          {/* consumptionType 데이터는 2글자로만 이뤄져 있으므로,
          드롭다운 항목들과 이름을 맞추기 위해 '위주' 글자 추가 */}
          {consumptionType === '소비유형을 선택하세요.'
            ? consumptionType
            : `${consumptionType} 위주`}
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
      <modal.ModalWrapper />
    </DropdownContainer>
  );
};

export default BudgetDropdown;
