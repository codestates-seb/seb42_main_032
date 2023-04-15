import styled from "styled-components"

export default function SearchBar() {
  return (
    <SearchBarBox>

    </SearchBarBox>
  )
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
    display: flex;
    align-items: center;
  }
`;

const SearchType = styled.div`
  width: 5.625rem;
  height: 100%;
  display: flex;
  align-items: center;

  span {
    text-align: center;
    text-decoration: underline;
  }
  
  .dropdown-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ClearButton = styled.div`
  width: 2.8125rem;
  height: 100%;
  border-radius: 100%;
  background-color: #805ad5
  color: white;
  display: flex
  align-items: center;
`;

const SearchButton = styled.div`
  width: 5.625rem;
  height: 100%;
  border-radius: 0 1.25rem 1.25rem 0;
  background-color: #805ad5
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;