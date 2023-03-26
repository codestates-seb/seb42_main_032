//TODO CATEGORY_001 카테고리 관리 페이지 구현
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import CategoryIcon, {
  CategoryIdMap,
} from '../components/category/CategoryIcon';
import AllCategoryList from '../components/category/AllCategoryList';
import { Button } from '@chakra-ui/react';
import { userInfoState } from '../util/store';
import { useRecoilValue } from 'recoil';
import { userInfoType } from './Login';

const BodyContainer = styled.div`
  margin-top: 60px;
  font-family: 'GmarketSansMedium';
  min-height: 70vh;
`;

const ContentContainer = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const HeaderWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;

  justify-content: space-between;
  h3 {
    font-size: 25px;
  }
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #6b46c1;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  color: #6b46c1;
  gap: 10px;
  :hover {
    background-color: #6b46c1;
    color: white;
    border-color: transparent;
  }
  :active {
    background-color: #b794f4;
    color: white;
    border-color: transparent;
  }
`;

const SelectedCategory = styled.div`
  border-right: 1px solid black;
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  min-width: 40vw;
  min-height: 70vh;
  h3 {
    padding-left: 20px;
    margin-bottom: 20px;
    text-align: left;
    font-size: 20px;
  }
  .selectedcategory-header__div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selectedcategory-noselect__div {
    margin-top: 10rem;
  }
  @media (max-width: 1024px) {
    border: none;
    border-bottom: 1px solid black;
    min-height: 0;
    padding-bottom: 20px;
  }
`;

const AllCategories = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  h3 {
    padding-left: 20px;
    margin-bottom: 20px;
    text-align: left;
    width: 400px;
    font-size: 20px;
  }
`;

const CategoryLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  font-size: 25px;
  /* border: 1px solid black; */
  box-shadow: 1px 1px 3px;
  border-radius: 5px;
  padding: 10px;
  min-width: 242px;
  width: 242px;
  cursor: pointer;
  /* max-width: px; */
  .category-delete__button {
    cursor: pointer;
    width: 25px;
    height: 25px;
    :hover {
      color: red;
    }
  }
  .category-name__div {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
`;

function CategoryEdit() {
  const userInfo = useRecoilValue(userInfoState);
  // 카테고리 리스트 배열에 대한 상태.
  const [allCategory, setAllCategory] = useState<
    { id: number; name: string; categoryId: number }[]
  >([]);

  // 자식컴포넌트 개별 모달창 관리하기 위해 추가함.
  // const [isOpen, setIsOpen] = useState(false);

  // 예산 설정 카테고리 리스트에 대한 상태
  const [selectedCategory, setSelectedCategory] = useState<
    { id: number; categoryId: number; name: string }[]
  >([]);

  const [budget, setBudget] = useState<
    { id?: number; memberCategoryId?: number }[]
  >([]);

  // 모달 창 닫기 이벤트 핸들러
  // const handleCloseEdit = () => {
  //   setIsOpen(false);
  // };

  // const handleClickCategory = () => {
  //   setSelectedCategory([...selectedCategory, el]);
  // };

  // 카테고리 추가 버튼 클릭 이벤트 핸들러
  // const handleClickAdd = () => {
  //   const postCategory = async () => {
  //     try {
  //       await axios.post(`http://localhost:3001/data`, {
  //         name: '',
  //         categoryIcon: 'AiOutlineQuestion',
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   postCategory();
  //   setTimeout(() => {
  //     getCategoryList();
  //   }, 100);
  // };

  // 카테고리 삭제 버튼 클릭 핸들러
  // const handleClickDelete = (el: { id: number; name: string }) => {
  //   if (data.length === 1) {
  //     return alert('카테고리는 최소 1개는 있어야 합니다.');
  //   }
  //   if (window.confirm(`'${el.name}' 카테고리를 삭제하시겠습니까?`)) {
  //     const delCategory = async () => {
  //       try {
  //         await axios.delete(`http://localhost:3001/data/${el.id}`);
  //         getCategoryList();
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     delCategory();
  //   }
  // };

  // 전체 카테고리 및 예산 설정 카테고리 api 요청
  const getCategory = async () => {
    try {
      // 전체 카테고리;
      const all =
        userInfo &&
        (await axios.get(
          `${import.meta.env.VITE_SERVER}/categories/${userInfo.id}`
        ));
      all && setAllCategory(all.data.data);

      // 예산 설정 카테고리
      const memberBudget =
        userInfo &&
        (await axios.get(
          `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo.id}`
        ));

      memberBudget && setBudget(memberBudget.data);

      // 예산 설정 카테고리(memberCategoryId) - 전체 카테고리 (id) 매핑
      const arr = [];
      for (const i of memberBudget?.data) {
        for (const j of all?.data.data) {
          if (i.memberCategoryId === j.id) {
            arr.push(j);
            break;
          }
        }
      }
      setSelectedCategory(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [userInfo]);

  return (
    <BodyContainer /* onClick={handleCloseEdit} */>
      <ContentContainer>
        <SelectedCategory>
          <div className="selectedcategory-header__div">
            <h3>예산 설정 카테고리</h3>
          </div>
          <CategoryLists>
            {selectedCategory && selectedCategory.length < 1 ? (
              <div className="selectedcategory-noselect__div">
                <div>선택한 카테고리가 없습니다.</div>
                <div>전체 카테고리 목록에서 선택해주세요.</div>
              </div>
            ) : (
              ''
            )}
            {selectedCategory &&
              selectedCategory.map((el) => {
                return (
                  <CategoryList key={el.id}>
                    <CategoryIcon icon={CategoryIdMap[el.categoryId]} />
                    <div className="category-name__div">{el.name}</div>
                  </CategoryList>
                );
              })}
          </CategoryLists>
        </SelectedCategory>
        <AllCategories>
          <h3>전체 카테고리</h3>
          <CategoryLists>
            {allCategory.map((el) => {
              return (
                <AllCategoryList
                  key={el.id}
                  data={el}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  budget={budget}
                  setBudget={setBudget}
                  userInfo={userInfo}
                />
              );
              /* 기본 카테고리 수정 불가
                  <CategoryList key={el.id}>
                    <CategoryDropdown
                      categoryIcon={el.categoryIcon}
                      categoryId={el.id}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                    <CategoryNameEdit
                      categoryName={el.name}
                      categoryId={el.id}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                    <RiDeleteBin5Line
                      className="category-delete__button"
                      onClick={() => handleClickDelete(el)}
                      style={{
                        cursor: 'pointer',
                        width: '25px',
                        height: '25px',
                      }}
                    />
                  </CategoryList>
                );
                */
            })}
          </CategoryLists>
        </AllCategories>
      </ContentContainer>
    </BodyContainer>
  );
}

export default CategoryEdit;
