import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { userInfoType } from '../../pages/Login';
import CategoryIcon, { CategoryIdMap } from './CategoryIcon';

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
  box-shadow: 1px 1px 3px;
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
  data: { id: number; categoryId: number; name: string };
  selectedCategory: { id: number; categoryId: number; name: string }[];
  setSelectedCategory: Dispatch<
    SetStateAction<{ id: number; categoryId: number; name: string }[]>
  >;
  budget: { id?: number; memberCategoryId?: number }[];
  setBudget: Dispatch<
    SetStateAction<{ id?: number; memberCategoryId?: number }[]>
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
    getBudget().then((memberBudget) => {
      if (
        memberBudget &&
        memberBudget.filter(
          (el: { id?: number; memberCategoryId?: number }) => {
            return el.memberCategoryId === data.id;
          }
        ).length > 0
      ) {
        setIsSelected(true);
        // setSelectedCategory([...selectedCategory, data]);
      }
    });
  }, []);

  // 예산 추가
  const postBudgetCategory = async () => {
    try {
      await axios({
        url: `${import.meta.env.VITE_SERVER}/budgets`,
        method: 'post',
        data: {
          memberCategoryId: data.id,
          amount: 0,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 예산 삭제
  const deleteBudgetCatrgory = async (id?: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/budgets/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // 예산 조회
  const getBudget = async () => {
    const memberBudget =
      userInfo &&
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo.id}`
        )
      ).data;
    return memberBudget;
  };

  // 카테고리 클릭 이벤트 핸들러
  const handleClickCategory = () => {
    if (!isSelected) {
      if (
        budget.filter((el) => {
          return el.memberCategoryId === data.id;
        }).length === 0
      ) {
        postBudgetCategory().then(() => {
          getBudget().then((memberBudget) => {
            setBudget(memberBudget);
          });
        });
        setIsSelected(true);
        setSelectedCategory([...selectedCategory, data]);
      } else {
        alert('이미 예산 설정에 추가한 카테고리입니다.');
      }
    } else {
      const budgetId = budget.filter((el) => {
        return el.memberCategoryId === data.id;
      })[0].id;
      deleteBudgetCatrgory(budgetId);

      setBudget(() => {
        const updateBudget = budget.filter((el) => {
          return el.id !== budgetId;
        });
        return updateBudget;
      });
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
        <CategoryIcon icon={CategoryIdMap[data.categoryId]} />
        <div className="category-name__div">{data.name}</div>
      </CategoryList>
    </Container>
  );
};

export default AllCategoryList;
