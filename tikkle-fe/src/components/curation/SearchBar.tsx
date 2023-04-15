import styled from 'styled-components';

import { MdClear } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('제목+태그');

  return (
    <SearchBarBox>
      <SearchType>
        <select
          name="search-type"
          onChange={(e: React.ChangeEvent) =>
            setSearchType((e.target as HTMLSelectElement).value)
          }
        >
          <option value="제목+태그">제목+태그</option>
          <option value="제목">제목</option>
          <option value="태그">태그</option>
        </select>
      </SearchType>
      <input
        type="text"
        value={keyword}
        onChange={(e: React.ChangeEvent) =>
          setKeyword((e.target as HTMLInputElement).value)
        }
      />
      <ClearButton>
        <MdClear />
      </ClearButton>
      <SearchButton>검색</SearchButton>
    </SearchBarBox>
  );
}

const SearchBarBox = styled.div`
  width: 80%;
  height: 3.75rem;
  border: 0.125rem solid black;
  border-radius: 1.25rem;

  font-family: GMarketSansMedium;

  display: flex;
  align-items: center;

  input {
    flex-grow: 1;
    height: 100%;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const SearchType = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;

  select {
    height: 90%;
  }
  select:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.div`
  width: 2.8125rem;
  height: 100%;
  border-radius: 100%;
  background-color: #805ad5
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchButton = styled.div`
  width: 5.625rem;
  height: 100%;
  border-radius: 0 1.1rem 1.1rem 0;
  background-color: #805ad5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
