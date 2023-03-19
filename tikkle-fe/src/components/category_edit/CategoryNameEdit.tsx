import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlinePencil } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';

const EditContainer = styled.div``;

const NoEditMode = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .react-icons {
    cursor: pointer;
  }
`;

const EditMode = styled.div`
  input {
    outline: none;
    padding: 10px;
    font-size: 20px;
    :focus {
      border: 2px solid #6b46c1;
      border-radius: 5px;
    }
  }
`;

interface CategoryNameEditProps {
  categoryName: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryNameEdit: React.FC<CategoryNameEditProps> = ({
  categoryName,
  isOpen,
  setIsOpen,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(categoryName);
  const handleClickEdit = (e: React.MouseEvent<Element>) => {
    e && e.stopPropagation();
    setIsEdit(true);
    setIsOpen(true);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleOnKeyUpEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsEdit(false);
    }
  }, [isOpen]);
  return (
    <EditContainer>
      {isEdit ? (
        <EditMode>
          <input
            contentEditable
            value={name}
            onChange={(e) => {
              handleChangeName(e);
            }}
            onKeyUp={(e) => handleOnKeyUpEnter(e)}
            onClick={(e) => {
              e && e.stopPropagation();
            }}
          ></input>
        </EditMode>
      ) : (
        <NoEditMode>
          {name}
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <HiOutlinePencil onClick={handleClickEdit} />
          </IconContext.Provider>
        </NoEditMode>
      )}
    </EditContainer>
  );
};

export default CategoryNameEdit;
