//TODO CATEGORY_001 카테고리 관리 페이지 구현
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import CategoryIcon from '../components/category/CategoryIcon';
import CategorySelectList from '../components/category/CategorySelectList';
import { Button } from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
// import CategoryDropdown from '../components/category/CategoryDropdown';
// import CategoryNameEdit from '../components/category/CategoryNameEdit';
// import { RiDeleteBin5Line } from 'react-icons/ri';

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
  min-width: 400px;
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
    /* button {
      padding: 5px 10px;
      font-size: 1.2rem;
      text-align: center;
      box-shadow: 1px 1px 1px;
      border-radius: 10px;
      :hover {
        background-color: #6b46c1;
        color: white;
      }
    } */
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
  width: fit-content;
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
  // 카테고리 리스트 배열에 대한 상태.
  const [data, setData] = useState<
    { id: number; name: string; categoryIcon: string }[]
  >([]);

  // 자식컴포넌트 개별 모달창 관리하기 위해 추가함.
  // const [isOpen, setIsOpen] = useState(false);

  // 예산 설정 카테고리 리스트에 대한 상태
  const [selectedCategory, setSelectedCategory] = useState<
    { id: number; categoryIcon: string; name: string }[]
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

  // 카테고리 리스트 api get 요청
  const getCategoryList = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/data`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <BodyContainer /* onClick={handleCloseEdit} */>
      <ContentContainer>
        <SelectedCategory>
          <div className="selectedcategory-header__div">
            <h3>예산 설정 카테고리</h3>
            <Button colorScheme={'purple'}>적용</Button>
          </div>
          <CategoryLists>
            {selectedCategory.map((el) => {
              return (
                <CategoryList key={el.id}>
                  <CategoryIcon icon={el.categoryIcon} />
                  <div className="category-name__div">{el.name}</div>
                </CategoryList>
              );
            })}
          </CategoryLists>
        </SelectedCategory>
        <AllCategories>
          <h3>전체 카테고리</h3>
          <CategoryLists>
            {data &&
              data.map((el) => {
                return (
                  <CategorySelectList
                    key={el.id}
                    data={el}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
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
