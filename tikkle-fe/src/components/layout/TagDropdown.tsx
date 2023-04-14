import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Loading from './Loading';
import axios from 'axios';

export type TagType = {
  id: number;
  name: string;
};

export function TagDropdown({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<TagType | undefined>>;
  }) {
  const [tags, setTags] = useState<TagType[]>();
  const [selectedTag, setSelectedTag] = useState<TagType>();
  const [isOpen, setIsOpen] = useState(false);

  const handleTag = (tag: TagType) => {
    setSelectedTag(tag);
    onChange(tag);
    setIsOpen(false);
  };
  const fetchTags = async () => {
      try {
        const data = (await axios.get(`${import.meta.env.VITE_SERVER}/tags`)).data.data;
        setTags(data);
      } catch (err) {
        console.log(err);
      }
    }

  useEffect(() => {
    fetchTags();
  }, [])

  return (
    <>
      {isOpen ? (
        <TagDropdownContainer>
          <SelectedTagContainer>
            {selectedTag && <TagItem>{selectedTag.name}</TagItem>}
          </SelectedTagContainer>
          <TagNotice>추가할 태그를 선택</TagNotice>
          <Suspense fallback={<Loading />}>
            <TagList>
              {tags?.map((tag: TagType) => (
                <div
                  className="tag-item-container"
                  onClick={() => handleTag(tag)}
                  key={tag.id}
                >
                  <TagItem>{tag.name}</TagItem>
                </div>
              ))}
            </TagList>
          </Suspense>
          
        </TagDropdownContainer>
      ) : (
        <TagDropdownUnopen>
          {selectedTag ? (
            <TagItem>{selectedTag.name}</TagItem>
          ) : (
            '태그를 선택해주세요.'
          )}
          <div className="open-dropdown" onClick={() => setIsOpen(true)}>
            <MdKeyboardArrowDown />
          </div>
        </TagDropdownUnopen>
      )}
    </>
  );
}

// 스타일 영역
const TagDropdownUnopen = styled.div`
  width: 60%;
  height: 56px;
  position: relative;
  border-radius: 10px;
  border: 1px solid #8a8c91;
  display: flex;
  align-items: center;
  padding-left: 8px;

  :hover {
    background-color: #ebebeb;
  }

  .open-dropdown {
    position: absolute;
    right: 0px;
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: rgb(107, 70, 193);
  }
`;

const TagDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  gap: 5px;
  border-radius: 10px;
  border: 1px solid #8a8c91;
  position: relative;
`;

const SelectedTagContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #ebebeb;
  padding-left: 8px;
  width: 100%;
  height: 56px;
  border-radius: 10px 10px 0px 0px;
`;

const TagNotice = styled.div`
  text-align: left;
  font-family: GMarketSansMedium;
  color: #8a8c91;
  width: 100%;
  padding-left: 8px;
`;

const TagList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  .tag-item-container {
    width: 100%;
    padding: 2px 0;
    display: flex;
    align-items: center;
    height: 48px;
  }
  .tag-item-container:hover {
    background-color: #ebebeb;
  }

  .tag-item-container > div {
    margin-left: 8px;
  }
`;

const TagItem = styled.div`
  display: flex;
  font-family: GMarketSansMedium;
  color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  background-color: #a256f3;
`;
