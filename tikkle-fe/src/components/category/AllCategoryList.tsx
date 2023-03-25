import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { userInfoType } from '../../pages/Login';
import CategoryIcon from './CategoryIcon';

//  카테고리 수정 페이지에서 전체 카테고리 리스트 컴포넌트

const Container = styled.div`
  .selected {
    background-color: #6b46c1;
    color: white;
    box-shadow: 2px 2px 4px #322659 inset;
    transition: 0.1s;
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

interface AllCategoryListProps {
  data: { id: number; categoryIcon: string; name: string };
  selectedCategory: { id: number; categoryIcon: string; name: string }[];
  setSelectedCategory: Dispatch<
    SetStateAction<{ id: number; categoryIcon: string; name: string }[]>
  >;
  budget: { id?: number; memberCategoryId: number }[];
  setBudget: Dispatch<
    SetStateAction<{ id?: number; memberCategoryId: number }[]>
  >;
  userInfo: userInfoType | null;
}

const AllCategoryList: React.FC<AllCategoryListProps> = ({
  data,
  selectedCategory,
  setSelectedCategory,
  budget,
  setBudget,
  userInfo,
}) => {
  // 카테고리 선택 여부 상태
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    for (const el of selectedCategory) {
      if (el.id === data.id) {
        setIsSelected(true);
      }
    }
  }, []);

  const postBudgetCategory = async () => {
    try {
      userInfo &&
        (await axios.post(`${import.meta.env.VITE_SERVER}/budgets`, {
          memberCategoryId: data.id,
          amount: 0,
        }));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBudgetCatrgory = async (id?: number) => {
    try {
      await axios.delete(`http://localhost:3002/budgets/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const patchBudgetCategory = async () => {
    try {
      await axios.patch(`http://localhost:3002/budgets`, {
        memberCategoryId: data.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getBudget = async () => {
    const budget = await axios.get(`http://localhost:3002/budgets`);
    setBudget(budget.data);
  };

  // 카테고리 클릭 이벤트 핸들러
  const handleClickCategory = () => {
    if (!isSelected) {
      if (
        budget.filter((el) => {
          return el.memberCategoryId === data.id;
        }).length === 0
      ) {
        postBudgetCategory();
        getBudget();
        setIsSelected(true);
        setSelectedCategory([...selectedCategory, data]);
      }
    } else {
      const budgetId = budget.filter((el) => {
        return el.memberCategoryId === data.id;
      })[0].id;
      deleteBudgetCatrgory(budgetId);
      setBudget(
        budget.filter((el) => {
          return el.id !== budgetId;
        })
      );
      getBudget();
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

export default AllCategoryList;
