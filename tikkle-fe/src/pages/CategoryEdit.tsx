//TODO CATEGORY_001 카테고리 관리 페이지 구현
import React, { useEffect } from 'react';
import styled from 'styled-components';
import CategoryDropdown from '../components/category_edit/CategoryDropdown';
import CategoryNameEdit from '../components/category_edit/CategoryNameEdit';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

const BodyContainer = styled.div`
  margin-top: 80px;
  font-family: 'GmarketSansMedium';
  min-height: 70vh;
`;

const ContentContainer = styled.div``;

const HeaderWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  justify-content: space-between;
  h3 {
    font-size: 25px;
  }
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  .category-add__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 5px;
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
  margin: 10px;
  gap: 20px;
  font-size: 25px;
  /* border: 1px solid black; */
  box-shadow: 1px 1px 3px;
  border-radius: 20px;
  padding: 10px;
`;

const dummyData: { id?: number; categoryName: string; categoryIcon: string }[] =
  [
    { id: 1, categoryName: '식비', categoryIcon: 'MdFastfood' },
    { id: 2, categoryName: '교통비', categoryIcon: 'IoIosSubway' },
    { id: 3, categoryName: '통신비', categoryIcon: 'BiPhoneCall' },
  ];

function CategoryEdit() {
  const [data, setData] = useState(dummyData);
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseEdit = () => {
    setIsOpen(false);
  };
  const handleClickAdd = () => {
    setData([...data, { categoryName: '', categoryIcon: 'AiOutlineQuestion' }]);
  };
  const handleClickDelete = (index: number) => {
    const newArr = [...data];
    newArr.splice(index, 1);
    console.log(newArr);
    setData([...newArr]);
  };

  return (
    <BodyContainer onClick={handleCloseEdit}>
      <ContentContainer>
        <HeaderWrap>
          <h3>카테고리 수정</h3>
          <AddButton onClick={handleClickAdd}>
            <div>Add</div>
            <div className="category-add__icon">
              <AddIcon boxSize={25} />
            </div>
          </AddButton>
        </HeaderWrap>
        <CategoryLists>
          {data &&
            data.map((el, index) => {
              return (
                <CategoryList>
                  <CategoryDropdown
                    categoryIcon={el.categoryIcon}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                  <CategoryNameEdit
                    categoryName={el.categoryName}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                  <RiDeleteBin5Line
                    onClick={() => handleClickDelete(index)}
                    style={{ cursor: 'pointer' }}
                  />
                </CategoryList>
              );
            })}
        </CategoryLists>
      </ContentContainer>
    </BodyContainer>
  );
}

export default CategoryEdit;
