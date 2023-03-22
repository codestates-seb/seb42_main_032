import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import CategoryIcon from './CategoryIcon';

const Container = styled.div`
  .selected {
    background-color: #6b46c1;
    color: white;
    box-shadow: 2px 2px 4px #322659 inset;
    transition: 0.1s;
    padding: 10px;
    padding-left: 12px;
    padding-top: 12px;
  }
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: 25px;
  /* border: 1px solid black; */
  box-shadow: 2px 2px 4px;
  border-radius: 5px;
  padding: 10px;
  min-width: 242px;
  transition: 0.1s;
  cursor: pointer;
  .category-name__div {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
`;

interface CategorySelectListProps {
  data: { id: number; categoryIcon: string; name: string };
  selectedCategory: { id: number; categoryIcon: string; name: string }[];
  setSelectedCategory: Dispatch<
    SetStateAction<{ id: number; categoryIcon: string; name: string }[]>
  >;
}

const CategorySelectList: React.FC<CategorySelectListProps> = ({
  data,
  selectedCategory,
  setSelectedCategory,
}) => {
  // 카테고리 선택 여부 상태
  const [isSelected, setIsSelected] = useState(false);

  // 카테고리 클릭 이벤트 핸들러
  const handleClickCategory = () => {
    if (!isSelected) {
      setIsSelected(true);
      setSelectedCategory([...selectedCategory, data]);
    } else {
      setIsSelected(false);

      // 선택된 전체 카테고리 중 클릭 된 카테고리 id와 같은 요소는 뺌.
      setSelectedCategory(selectedCategory.filter((el) => el.id !== data.id));
    }
  };
  return (
    <Container>
      <CategoryList
        className={isSelected ? 'selected' : ''}
        onClick={handleClickCategory}
      >
        <CategoryIcon icon={data.categoryIcon} />
        <div className="category-name__div">{data.name}</div>
      </CategoryList>
    </Container>
  );
};

export default CategorySelectList;
