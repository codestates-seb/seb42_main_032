//@ts-ignore

//TODO 헤더 구현
import React from 'react';
import styled from 'styled-components';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'GmarketSansMedium';
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  img {
    width: 120px;
    height: 60px;
  }
  svg {
    color: #6b46c1;
  }
  .header-logo__img {
    margin-left: 10px;
  }
  .header-user__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .header-menulist {
    background-color: white;
    border: 1px solid gray;
    border-radius: 7px;
  }
  .header-menubutton {
    cursor: pointer;
    span {
      display: flex;
      align-items: center;
    }
  }
`;
const LoginButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  color: #6b46c1;
  background-color: transparent;
  border: 1px solid #6b46c1;
  border-radius: 6px;
  font-size: 15px;
  :hover {
    background-color: #b794f4;
    color: white;
    border-color: transparent;
  }
  :active {
    background-color: #6b46c1;
    color: white;
    border-color: transparent;
  }
`;
const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const BeforeLogin = styled.div`
  margin-right: 15px;
`;
const AfterLogin = styled.div`
  margin-right: 15px;
  .header-userinfo__div {
    padding: 15px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 100%;
    :hover {
      background-color: #6b46c1;
      color: white;
      transition: 0.2s all;
    }
  }
  .header-menulistbutton {
    padding: 15px;
    width: 100%;
    :hover {
      background-color: #6b46c1;
      color: white;
      transition: 0.2s all;
    }
  }
  .header-logoutbutton {
    padding: 15px;
    width: 100%;
    :hover {
      color: red;
      transition: 0.2s all;
    }
  }
`;
const UserButton = styled.button`
  border-radius: 50%;
  border: none;
  background-color: transparent;
`;

const Button = styled.div`
  cursor: pointer;
`;
function Header() {
  return (
    <HeaderContainer>
      <img className="header-logo__img" src="tikkle-logo.svg" alt="logo"></img>
      <HeaderContentWrap>
        <BellIcon boxSize={25} />
        <BeforeLogin>
          <LoginButton>Log In</LoginButton>
        </BeforeLogin>
        <AfterLogin>
          <Menu>
            <MenuButton className="header-menubutton" as={UserButton}>
              <img className="header-user__img" src="user.png" alt="user" />
              <ChevronDownIcon boxSize={25} />
            </MenuButton>
            <MenuList className="header-menulist">
              <MenuItem as={Button}>
                <div className="header-userinfo__div">회원정보</div>
              </MenuItem>
              <MenuItem as={Button}>
                <div className="header-menulistbutton">예산 설정</div>
              </MenuItem>
              <MenuItem as={Button}>
                <div className="header-menulistbutton">예산 조회</div>
              </MenuItem>
              <MenuItem as={Button}>
                <div className="header-menulistbutton">거래내역 조회</div>
              </MenuItem>
              <MenuItem as={Button}>
                <div className="header-menulistbutton">카테고리 수정</div>
              </MenuItem>
              <MenuItem as={Button}>
                <div className="header-logoutbutton">로그아웃</div>
              </MenuItem>
            </MenuList>
          </Menu>
        </AfterLogin>
      </HeaderContentWrap>
    </HeaderContainer>
  );
}

export default Header;
