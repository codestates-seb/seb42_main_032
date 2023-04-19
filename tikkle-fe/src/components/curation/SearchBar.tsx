import styled from 'styled-components';

import { MdClear } from 'react-icons/md';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { curationType } from '../../pages/Board';

const SearchBar = () => {
  const [keyword, setKeyword] = useState(
    window.location.search
      ? decodeURI(window.location.search.split('&')[1].split('=')[1])
      : ''
  );
  const [searchType, setSearchType] = useState(0);

  const alretEmptyKeyword = () => {
    if (keyword === '') alert('검색어를 입력해주세요.');
  };

  // ToDo 서버에서 검색 타입을 params로 받도록 수정되면 해당 내용에 맞춰 params 부분 업데이트
  const requestSearch = async () => {
    // if (keyword !== '') {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_SERVER}/curations`,
    //       {
    //         params: {
    //           keyword: keyword,
    //           page: 0,
    //           searchType: searchType,
    //         },
    //       }
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    window.location.href = `${
      import.meta.env.VITE_CLIENT
    }/board?page=0&keyword=${keyword}&searchType=${searchType}`;
  };

  const handleOnKeyUpEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      requestSearch();
    }
  };

  const handleClearButton = () => {
    setKeyword('');
    window.location.href = `${import.meta.env.VITE_CLIENT}/board`;
  };

  useEffect(() => {}, [searchType]);

  return (
    <SearchBarBox>
      <SearchType>
        <select
          name="search-type"
          onChange={(e: React.ChangeEvent) =>
            setSearchType(Number((e.target as HTMLSelectElement).value))
          }
        >
          <option value="0">제목+태그</option>
          <option value="1">제목</option>
          <option value="2">태그</option>
        </select>
      </SearchType>
      <input
        type="text"
        value={keyword}
        onChange={(e: React.ChangeEvent) =>
          setKeyword((e.target as HTMLInputElement).value)
        }
        onKeyUp={(e) => handleOnKeyUpEnter(e)}
      />
      <ClearButton onClick={handleClearButton}>
        <MdClear />
      </ClearButton>
      <SearchButton
        onClick={() => {
          alretEmptyKeyword();
          requestSearch();
        }}
      >
        검색
      </SearchButton>
    </SearchBarBox>
  );
};

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
  height: 2.8125rem;
  border-radius: 100%;
  background-color: #805ad5;
  color: white;
  margin-right: 0.5rem;
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

export default SearchBar;
