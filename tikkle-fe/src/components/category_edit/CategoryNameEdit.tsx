import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlinePencil } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import axios from 'axios';

const EditContainer = styled.div``;

const NoEditMode = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    word-break: break-all;
    max-width: 150px;
  }
  .react-icons {
    cursor: pointer;
  }
`;

const EditMode = styled.div`
  input {
    outline: none;
    padding: 10px;
    font-size: 20px;
    max-width: 200px;
    :focus {
      border: 2px solid #6b46c1;
      border-radius: 5px;
    }
  }
`;

interface CategoryNameEditProps {
  categoryName: string;
  categoryId: number | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryNameEdit: React.FC<CategoryNameEditProps> = ({
  categoryName,
  categoryId,
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
      const patchCategoryName = async () => {
        try {
          await axios.patch(`http://localhost:3001/data/${categoryId}`, {
            name,
          });
        } catch (err) {
          console.log(err);
        }
      };
      patchCategoryName();
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
          <span>{name}</span>
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <HiOutlinePencil onClick={handleClickEdit} />
          </IconContext.Provider>
        </NoEditMode>
      )}
    </EditContainer>
  );
};

export default CategoryNameEdit;
