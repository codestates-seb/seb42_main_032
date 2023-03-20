//TODO CATEGORY_001 카테고리 관리 페이지 구현
import React, { useEffect } from 'react';
import styled from 'styled-components';
import CategoryDropdown from '../components/category_edit/CategoryDropdown';
import CategoryNameEdit from '../components/category_edit/CategoryNameEdit';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import axios from 'axios';

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
  /* max-width: 300px; */
`;

function CategoryEdit() {
  const [data, setData] = useState<
    { id: number; name: string; categoryIcon: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseEdit = () => {
    setIsOpen(false);
  };

  const handleClickAdd = () => {
    const postCategory = async () => {
      try {
        await axios.post(`http://localhost:3001/data`, {
          name: '',
          categoryIcon: 'AiOutlineQuestion',
        });
      } catch (err) {
        console.log(err);
      }
    };
    postCategory();
    getCategoryList();
  };
  const handleClickDelete = (id: number) => {
    const delCategory = async () => {
      try {
        await axios.delete(`http://localhost:3001/data/${id}`);
        getCategoryList();
      } catch (err) {
        console.log(err);
      }
    };
    delCategory();
  };
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

  useEffect(() => {}, [data]);

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
            data.map((el) => {
              return (
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
                    onClick={() => handleClickDelete(el.id)}
                    style={{ cursor: 'pointer', width: '25px', height: '25px' }}
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
