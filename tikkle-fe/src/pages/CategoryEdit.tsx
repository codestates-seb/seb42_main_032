//TODO CATEGORY_001 카테고리 관리 페이지 구현
import React from 'react';
import styled from 'styled-components';
import CategoryDropdown from '../components/category_edit/CategoryDropdown';
import { AddIcon } from '@chakra-ui/icons';

const BodyContainer = styled.div`
  margin-top: 80px;
`;

const ContentContainer = styled.div``;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  .category-add__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 5px;
  }
`;

const CategoryLists = styled.div`
  display: flex;
`;

function CategoryEdit() {
  return (
    <BodyContainer>
      <ContentContainer>
        <HeaderWrap>
          <h3>카테고리 수정</h3>
          <AddButton>
            <div>Add</div>
            <div className="category-add__icon">
              <AddIcon boxSize={25} />
            </div>
          </AddButton>
        </HeaderWrap>
        <CategoryLists>
          <CategoryDropdown /> 커피
        </CategoryLists>
      </ContentContainer>
    </BodyContainer>
  );
}

export default CategoryEdit;
